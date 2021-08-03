<template>
	<view class="content">
		<view class="text-area">
			<button @tap="showRoute">起点,途经点，终点导航组件</button>
			<text>
				{{ JSON.stringify(data) }}
			</text>
		</view>
	</view>
</template>

<script>
	const sdkwx = uni.requireNativePlugin('AMap-NavSdkWX');
	var navi = uni.requireNativePlugin('AMap-Navi');
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad() {
			navi.addAMapNaviListener(function(res){
				if (res.type == "onCalculateRouteSuccess") {//路径规划成功回调
					console.log("onCalculateRouteSuccess", res.data);
					var routeid = res.data.routeid[0];
					navi.getNaviPath(routeid, function(res2){
						console.log("getNaviPath", res2);
					});
				}
				if(res.type == "onArriveDestination") {
					console.log("onArriveDestination", res.data);
					this.data = res.data;
				}
				if(res.type == "onNaviInfoUpdate") {
					console.log("onNaviInfoUpdate", res.data);
				}
				if(res.type == "onEndEmulatorNavi") {
					console.log("onEndEmulatorNavi", res.data);
				}
				
			});
		},
		methods: {
			showRoute() {
				sdkwx.showRoute({
				     theme:0,
				    trafficEnabled:true
				}, function(res) { 
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.booking-success {
		width: 500rpx;
		text-align: center;
		padding: 30rpx 30rpx 60rpx;
		border-radius: 20px;
		.booking-title {
			background-color: $uni-color-botton;
			padding-bottom: 6px;
			margin-bottom: 20px;
			.booking-title-text {
				color: #FFFFFF;
				border-bottom: 2px solid #FFFFFF;
				display: inline-block;
				font-size: 20px;
			}
		}
		.booking-btns {
			display: flex;
			justify-content: space-evenly;
			padding-top: 20px;
			.booking-btn {
				color: #FFFFFF;
				width: 90px;
				border-radius: 20px;
				padding-top: 2px;
				padding-bottom: 2px;
			}
			.booking-btn_cancel {
				background-color: $uni-color-button-grey;
			}
			.booking-btn_ok {
				background-color: $uni-color-botton;
			}
		}
	}
</style>
