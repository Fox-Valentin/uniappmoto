import store from '../store/index.js';
export default {
	config: {
		domain: "http://222.90.83.230:9080",
		header: {
			"Access-Control-Allow-Headers":"content-type, x-requested-with",
			"Access-Control-Allow-Origin": "*",
			'Content-Type':'application/json;charset=UTF-8',
		},
		data: {},
		method: "GET",
		dataType: "json",
		token: "3da151c8-6882-41fa-a405-797fb19c5ca5"
	},
	request(options = {}, ifToken=true) {
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.token = options.token || this.config.token || store.state.token;
		// options.url = this.config.domain+options.url;
		const token = options.token;
		// ifToken 是否验证token
		if(ifToken === true) {
			if (!this.checkToken(token)) return;
		}
		if (token) {
			options.header = {
				Authorization: `Bearer ${token}`,
				...options.header,
			}
		}
		console.log('options', options)
		return uni.request(options);
	},
	get(url,data,options={},ifToken=true){
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options,ifToken).then(result => {
			const [error, res] = result;
			if(error) {
				this.errorCheck(error, res)
			} else {
				const {data} = res;
				if(data.code === 200) {
					return data.data || data;
				} else {
					if(data.code === 401) {
						uni.showToast({ title: '请先登录', icon:"none" })
						uni.navigateTo({
							url: '/pages/login/login'
						});
						return null;
					} else {
						uni.showToast({ title: data.msg,icon:"none" });
						return null;
					}
				}
			}
		});
	},
	post(url,data,options={},ifToken=true){
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options,ifToken).then(result => {
			const [error, res] = result;
			if(error) {
				this.errorCheck(error, res)
			} else {
				const {data} = res;
				if(data.code === 200) {
					return data.data || data;
				} else {
					if(data.code === 401) {
						uni.showToast({ title: '请先登录', icon:"none" })
						uni.navigateTo({
							url: '/pages/login/login'
						});
						return null;
					} else {
						uni.showToast({ title: data.msg,icon:"none" });
						return null;
					}
				}
			}
		});
	},
	put(url,data,options={},ifToken=true){
		options.url = url;
		options.data = data;
		options.method = 'PUT';
		return this.request(options,ifToken).then(result => {
			const [error, res] = result;
			if(error) {
				this.errorCheck(error, res)
			} else {
				const {data} = res;
				if(data.code === 200) {
					return data.data;
				} else {
					if(data.code === 401) {
						uni.showToast({ title: '请先登录', icon:"none" })
						uni.navigateTo({
							url: '/pages/login/login'
						});
						return null;
					} else {
						uni.showToast({ title: data.msg,icon:"none" });
						return null;
					}
				}
			}
		});
	},
	delete(url,data,options={},ifToken=true){
		options.url = url;
		options.data = data;
		options.method = 'DELETE';
		return this.request(options,ifToken).then(result => {
			const [error, res] = result;
			if(error) {
				this.errorCheck(error, res)
			} else {
				const {data} = res;
				if(data.code === 200) {
					return data;
				} else {
					if(data.code === 401) {
						uni.showToast({ title: '请先登录', icon:"none" })
						uni.navigateTo({
							url: '/pages/login/login'
						});
						return null;
					} else {
						uni.showToast({ title: data.msg,icon:"none" });
						return null;
					}
				}
			}
		});
	},
	// 上传图片
	upload(url,options = {}){
		// options.url = this.config.baseUrl+url;
		options.url = url;
		options.name = options.name || "file";
		options.fileType = options.fileType || "image";
		options.token = options.token || this.config.token || store.state.token;
		const token = options.token;
		
		// TODO：token增加等操作
		if (token) {
			// 验证是否登录
			if (!this.checkToken(token)) return;
			options.header = {
				Authorization: `Bearer ${token}`,
			};
		}
		
		return uni.uploadFile(options).then(result => {
			const [error, res] = result;
			if(error) {
				this.errorCheck(error, res)
			} else {
				let {data} = res;
				try{
					data = JSON.parse(data);
				}catch(e){
					uni.showToast({ title: '上传数据出错', icon:"none" })
					return;
				}
				if(data.code === 200) {
					return data.data;
				} else {
					if(data.code === 401) {
						uni.showToast({ title: '请先登录', icon:"none" })
						uni.navigateTo({
							url: '/pages/login/login'
						});
						return null;
					} else {
						uni.showToast({ title: data.msg,icon:"none" });
						return null;
					}
				}
			}
		});;
	},
	// 错误处理
	errorCheck(err,res,errfun = false,resfun = false){
		if (err) {
			typeof errfun === 'function' && errfun();
			uni.showToast({ title: '加载失败',icon:"none" });
			return false;
		}
		if (res.data.errorCode) {
			typeof errfun === 'function' && resfun();
			uni.showToast({ title: res.data.msg,icon:"none" });
			return false;
		}
		return true;
	},
	// 验证用户是否登录
	checkToken(checkToken){
		if (!checkToken) {
			uni.showToast({ title: '请先登录', icon:"none" })
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return false;
		}
		return true;
	},
	// 验证用户权限
	checkAuth(checkAuth){
		if (checkAuth && !User.userinfo.phone) {
			uni.showToast({ title: '请先绑定手机号码', icon:"none" })
			uni.navigateTo({
				url: '/pages/user-bind-phone/user-bind-phone'
			});
			return false;
		}
		return true;
	}
}
