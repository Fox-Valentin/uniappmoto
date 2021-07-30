import $http from "./http.js";
import store from '../store/index.js';
export default {
	// 用户token 测试token：4cd36bf70649475ac0cd6fae78250954474a4350
	token:false,
	// 用户信息
	userinfo:false,
	// 用户相关统计
	counts:{},
	// 绑定第三方登录情况
	userbind:false,
	// 初始化
	__init(){
		// 获取用户信息
		this.userinfo = store.state.userinfo;
		this.token = store.state.token;
		// this.counts = uni.getStorageSync("counts");
		// this.userbind = uni.getStorageSync("userbind");
		// this.OnUserCounts();
		// 如果用户id存在，则连接 
		if (this.userinfo.id) {
			// 连接socket
		}
	},
	// 权限验证跳转
	navigate(options,NoCheck = false,type = "navigateTo"){
		// 是否登录验证
		if (!$http.checkToken(true)) return;
		// 跳转
		switch (type){
			case "navigateTo":
			uni.navigateTo(options);
				break;
			case "redirectTo":
			uni.redirectTo(options);
				break;
			case "reLaunch":
			uni.reLaunch(options);
				break;
			case "switchTab":
			uni.switchTab(options);
				break;
		}
	},
	// 登录
	async login(options ={}){
		uni.showLoading({ title: '登录中...', mask: true });
		// 请求登录
		let [err,res] = await $http.request({ ...options, method: 'POST' }, false);
		// 登录失败
		if (!$http.errorCheck(err,res)){
			uni.hideLoading();
			return false;
		}
		// 登录成功 保存状态
		this.token = res.data.data.access_token;
		store.dispatch('set_token', this.token);
		this.userinfo = await this.getUserInfo()
		store.dispatch('set_userinfo', this.userinfo)
		// this.userinfo = this.__formatUserinfo(res.data.data);
		// 成功提示
		uni.hideLoading();
		uni.showToast({ title: '登录成功' });
		// 返回上一步
		// if (!options.Noback) {
		// 	uni.navigateBack({ delta: 1 });
		// }
		return true;
	},
	// 退出登录
	async logout(showToast = true){
		// 退出登录
		await $http.post('/user/logout',{},{ 
			token:true,
			checkToken:true ,
		});
		// 清除缓存
		uni.removeStorageSync('userinfo');
		uni.removeStorageSync('token');
		uni.removeStorageSync('counts');
		// 清除状态
		this.token = false;
		this.userinfo = false;
		this.userbind = false;
		this.counts = {};
		// 关闭socket
		$chat.Close();
		// 返回home页面
		uni.switchTab({ url:"/pages/home/home" })
		// 退出成功
		if (showToast) {
			return uni.showToast({ title: '退出登录成功' });
		}
	},
	// 获取用户相关统计信息
	async getCounts(){
		// 统计获取用户相关数据（总文章数，今日文章数，评论数 ，关注数，粉丝数，文章总点赞数）
		let [err,res] =await $http.get('/user/getcounts/'+this.userinfo.id,{},{
			token:true,checkToken:true
		})
		// 请求错误处理
		if (!$http.errorCheck(err,res)) return;
		// 成功
		this.counts = res.data.data;
		// 存储缓存
		uni.setStorageSync("counts", this.counts);
	},
	// 监听用户统计变化
	OnUserCounts(){
		uni.$on('updateData',(data)=>{
			// 文章数+1
			if (data.type == 'updateList'){
				this.counts.post_count++;
			}
			// 评论数+1
			if (data.type == 'updateComment') {
				this.counts.comments_count++;
			}
			// // 粉丝数和关注数变化
			if (data.type == 'guanzhu') {
				data.data ? 
					this.counts.withfollow_count++ 
					: this.counts.withfollow_count--;
			}
			// 更新缓存
			uni.setStorageSync("counts", this.counts);
		})
	},
	// 加入浏览历史
	addHistoryList(item){
		// 取出缓存
		let list = uni.getStorageSync('HistoryList_'+this.userinfo.id);
		list = list ? JSON.parse(list) : [];
		// 查看当前记录是否存在
		let index = list.findIndex((val)=>{
			return val.id === item.id;
		})
		// 不存在直接追加
		if (index == -1) {
			list.push(item);
			uni.setStorageSync('HistoryList_'+this.userinfo.id,JSON.stringify(list))
			console.log("加入缓存成功");
		}
	},
	// 清除浏览历史
	clearHistory(){
		uni.removeStorageSync('HistoryList_'+this.userinfo.id);
	},
	// 获取当前用户第三方绑定情况
	async getUserBind(){
		let [err,res] =await $http.get('/user/getuserbind',{},{
			token:true,checkToken:true
		});
		if (!$http.errorCheck(err,res)) return false;
		this.userbind = res.data.data;
		// 存储缓存
		uni.setStorageSync("userbind", this.userbind);
		return true;
	},
	// userinfo格式转换
	__formatUserinfo(obj){
		// 手机/邮箱/账号登录
		if (obj.logintype == "username" || obj.logintype == "email" || obj.logintype == "phone") {
			// 设置默认头像
			obj.userpic = obj.userpic || "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120";
			return obj;
		}
		// 第三方登录（已绑定）
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.user.username || obj.nickname,
				userpic: obj.user.userpic || obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password:obj.user.password,
				token: obj.token,
				userinfo: {
				    id: obj.user.userinfo.id,
				    user_id: obj.user.userinfo.user_id,
				    age: obj.user.userinfo.age,
				    sex: obj.user.userinfo.sex,
				    qg: obj.user.userinfo.qg,
				    job: obj.user.userinfo.job,
				    path: obj.user.userinfo.path,
				    birthday: obj.user.userinfo.birthday,
				}
			}
		}
		// 第三方登录（未绑定）
		return {
			id: obj.user_id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	},
	// 转换第三方登录格式
	__formatOtherLogin(provider,options){
		return {
			provider:provider,
			openid:options.userInfo.unionId || options.userInfo.openId,
			expires_in:options.authResult.expires_in,
			nickName:options.userInfo.nickName,
			avatarUrl:options.userInfo.avatarUrl,
		}
	},
	// 获取用户信息
	getUserInfo(options={}) {
		return $http.get('/api/app/api/user/info', null, options)
	}
}



/*

手机/邮箱/账号登录	logintype:username/email/phone
{
    "msg": "登录成功",
    "data": {
        "id": 15,
        "username": "13450772009",
        "userpic": "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120",
        "phone": "13450772009",
		"password":true,
        "email": null,
        "status": 1,
        "create_time": "2019-05-17 15:35:14",
        "logintype": "phone",
        "token": "b8de6712ee81c9004987152c9d58ca751edd691e",
        "userinfo": {
            "id": 6,
            "user_id": 15,
            "age": 0,
            "sex": 0,
            "qg": 0,
            "job": "IT",
            "path": "广东广州",
            "birthday": "1990-11-11"
        }
    }
}

第三方登录
{
    "msg": "登录成功",
    "data": {
        "id": 6,
        "type": "weixin",
        "openid": "oU5Yytz7ielo7Xw00LMgZsPeSDkQ",
        "user_id": 17,
        "nickname": "楚绵222",
        "avatarurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/WiaWkkJjnG4WhI2KERDGPanF9GlNM3SWDTibibKEuHru1Jrd4pfGwialjn5tTCVLvEOq8RnZ8QmqkxyNAYXtuuGcBg/132",
        "logintype": "weixin",
        "token": "82e61b691390b98e715927051dff4f9a21839ff8",
        "user": {
            "id": 17,
            "username": "13450772012",
            "userpic": "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120",
            "phone": "13450772012",
			"password":false,
            "email": null,
            "status": 1,
            "create_time": "2019-05-17 17:14:59",
            "userinfo": {
                "id": 7,
                "user_id": 17,
                "age": 0,
                "sex": 0,
                "qg": 0,
                "job": "IT",
                "path": "广东广州",
                "birthday": "1990-11-11"
            }
        }
    }
}

第三方登录（未绑定）
{
    "msg": "登录成功",
    "data": {
        "id": 6,
        "type": "weixin",
        "openid": "oU5Yytz7ielo7Xw00LMgZsPeSDkQ",
        "user_id": 0,
        "nickname": "楚绵222",
        "avatarurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/WiaWkkJjnG4WhI2KERDGPanF9GlNM3SWDTibibKEuHru1Jrd4pfGwialjn5tTCVLvEOq8RnZ8QmqkxyNAYXtuuGcBg/132",
        "logintype": "weixin",
        "token": "499b073624aefd42e61f7ff3f410a494e0eb1343",

    }
}

*/