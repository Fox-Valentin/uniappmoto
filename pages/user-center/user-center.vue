<template>
	<view class="page-wrapper">
		<template v-if="!islogin">
			<!-- 未登录 -->
			<view class="u-f-ajc">登陆仿糗百，体验更多功能</view>
			<!-- 第三方登陆 -->
			<other-login></other-login>
			<!-- 账号密码登陆 -->
			<view class="u-f-ajc" @tap="openLogin">账号密码登陆 <view class="icon iconfont icon-jinru"></view> </view>
		</template>
		<template v-else>
			<!-- 登陆 -->
			<view class="user-info-wrapper">
				<view class="user-info_avatar">
					<image src="../../static/demo/userpic/11.jpg" mode="widthFix"></image>
				</view>
				<view class="user-info_data">
					<view class="user-info_title">八戒是条狗</view>
					<view class="user-info_account">摩托车乐园号: 28745666</view>
					<view class="user-info_list">
						<view class="user-info_value">
							<text>21</text>
							<text>21</text>
							<text>21</text>
							<text>21</text>
						</view>
						<view class="user-info_key">
							<text>关注</text>
							<text>粉丝</text>
							<text>赞赏</text>
							<text>评论</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<!-- 数据 -->
		<view class="list-wrapper">
			<swiper-tab-head
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabtap="tabtap">
			</swiper-tab-head>
			<view class="tab-list">
				<template v-if="tabIndex === 0">
					<fabu-list></fabu-list>
				</template>
				<template v-else-if="tabIndex === 1">
					<shoucangList></shoucangList>
				</template>
				<template v-else-if="tabIndex === 2">
					<xihuanList></xihuanList>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import fabuList from "../../components/user-center/fabu-list.vue"
	import shoucangList from "../../components/user-center/shoucang-list.vue"
	import xihuanList from "../../components/user-center/xihuan-list.vue"
	export default {
		components: {
			swiperTabHead,
			fabuList,
			shoucangList,
			xihuanList,
		},
		data() {
			return {
				swiperheight:500,
				islogin:true,
				homeinfo:{
					userpic:"../../static/demo/userpic/11.jpg",
					username:"昵称",
					totalnum:0,
					todaynum:0,
				},
				tabIndex:0,
				tabBars:[
					{ name:"发布",id:"fabu" },
					{ name:"收藏",id:"shoucang" },
					{ name:"喜欢",id:"xihuan" },
				],	
			};
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url: '../user-set/user-set',
				});
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					let height=res.windowHeight-uni.upx2px(390)
					this.swiperheight=height;
				}
			});
		},
		methods:{
			openLogin(){
				uni.navigateTo({
					url: '../login/login'
				});
			},
			// tabbar点击事件
			tabtap(index){
				this.tabIndex=index;
			},
			// 滑动事件
			tabChange(e){
				this.tabIndex=e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
.user-info-wrapper {
	padding-left: 100rpx;
	padding-right: 100rpx;
	padding-top: 50rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	.user-info_title {
		font-size: 20px;
		color: $uni-text-color-normal;
		padding-bottom: 2px;
	}
	.user-info_account {
		color: $uni-font-color-dark-black;
	}
	.user-info_data {
		padding-left: 16px;
	}
	.user-info_list {
		color: $uni-font-color-dark-black;
		padding-top: 10px;
	}
	.user-info_value {
		display: flex;
		justify-content: space-around;
	}
	.user-info_key {
		display: flex;
		justify-content: space-around;
	}
}
.user-info_avatar>image{
	flex-shrink: 0;
	width: 200upx;
	height: 200upx;
	border-radius: 100%;
	margin-right: 15upx;
}
.page-wrapper {
	background-image: url(../../static/bgimg/5.png);
	background-repeat: no-repeat;
	background-size: cover;
	background-origin: center;
	background-position: center;
}
.list-wrapper {
	background-color: #FFFFFF;
	border-radius: 30px 30px 0 0;
}
.tab-list {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
}
.tab-list .swiper-box {
	flex: 1;
	width: 100%;
	height: calc(100% - 100upx);
}
</style>
