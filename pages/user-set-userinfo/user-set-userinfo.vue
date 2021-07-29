<template>
	<view class="body">
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>头像</view>
			<view class="u-f-ac" @tap="changeimg">
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>手机号</view>
			<view class="u-f-ac">
				<view>{{phone}}</view>
				<view class="icon iconfont icon-liulan"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>昵称</view>
			<view class="u-f-ac">
				<input type="text" v-model="username" />
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>性别</view>
			<view class="u-f-ac" @tap="changeOne('sex')">
				<view>{{sex}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
			<view class="u-f-ac">
				<view>{{birthday}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
			</picker>
		</view>
<!-- 		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>职业</view>
			<view class="u-f-ac" @tap="changeOne('qg')">
				<view>{{qg}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view> -->
<!-- 		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>情感</view>
			<view class="u-f-ac" @tap="changeOne('job')">
				<view>{{job}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view> -->
<!-- 		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>家乡</view>
			<view class="u-f-ac" @tap="showMulLinkageThreePicker">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view> -->
		
		<button class="user-set-btn" 
		type="primary" @tap="submit">完成</button>
		
		
		<!-- <mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker> -->
		
	</view>
</template>

<script>
	let sex=['保密','男','女'];
	let qg=['秘密','未婚','已婚'];
	let job=['秘密','IT','老师'];
	// import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue";
	import tool from "../../common/tool.js"
	export default {
		components:{
			// mpvueCityPicker
		},
		data() {
			return {
				userpic:"http://222.90.83.242:17007/motopark/avatar/2021/07/29/4d88ba52-048f-421b-a661-a4070ae109b5.jpeg",
				username:"哈哈哈",
				sex:"不限",
				birthday:"1987-02-07",
				phone: '18288888888',
			}
		},
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			this.User.getUserInfo().then(data => {
				this.userpic = data.avatar;
				this.username = data.nickName;
				this.birthday = data.birth;
				this.phone = data.phoneNumber;
				this.sex = sex[data.gender];
			})
		},
		methods: {
			// 三级联动
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label;
			},
			// 修改生日
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			// 修改头像
			changeimg(){
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success: (res) => {
						this.userpic=res.tempFilePaths[0];
						this.$http.upload("/api/app/api/user/uploadAvatar",
						{
							filePath: this.userpic
						}).then(result => {
							this.userpic = result;
						})
					}
				})
			},
			// 单列选择
			changeOne(val){
				uni.showActionSheet({
					itemList: sex,
					success: res => {
						this.sex=arr[res.tapIndex];
					},
				});
			},
			submit(){
				const url = "/api/app/api/user/saveInfo";
				const data = this.formatValue();
				this.$http.post(url, data).then(res => {
					uni.showToast({ title: '保存成功', icon:"none" })
					this.User.getUserInfo().then(data => {
						this.$store.dispatch('set_userinfo', data);
					})
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			validateValue() {
				this.username = this.username.trim();
				if(!this.username) {
					uni.showToast({ title: '请填写昵称', icon:"none" })
					return false;
				}
				if(this.sex) {
					uni.showToast({ title: '请选择性别', icon:"none" })
					return false;
				}
				if(this.birthday) {
					uni.showToast({ title: '请选择生日', icon:"none" })
					return false;
				}
				return true;
			},
			formatValue() {
				// '保密','男','女'
				const data = {
					Birth: this.birthday,
					Gender: 0,
					nickName: this.username,
					Avatar: this.userpic
				}
				switch (this.sex){
					case '保密':
						data.Gender = 0;
						break;
					case '男':
						data.Gender = 1;
						break;
					case '女':
						data.Gender = 2;
						break;
					default:
						break;
				}
				return data;
			}
		}
	}
</script>

<style lang="scss">
@import "../../common/form.css";
.user-set-userinfo-list{
	padding: 20upx;
	border-bottom: 1upx solid #F4F4F4;
}
.user-set-userinfo-list>view:first-child{
	font-size: 32upx;
	font-weight: bold;
	color: #9B9B9B;
}
.user-set-userinfo-list>view:last-child>image{
	width: 80upx;
	height: 80upx;
	border-radius: 100%;
}
.user-set-userinfo-list>view:last-child>input{
	text-align: right;
}
.user-set-userinfo-list>view:last-child>view:last-of-type{
	margin-left: 20upx;
	color: #9B9B9B;
}
.user-set-btn {
	background-color: $uni-color-botton;
	color: #FFFFFF;
	border-radius: 50rpx;
}
</style>
