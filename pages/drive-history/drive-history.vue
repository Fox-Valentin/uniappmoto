<template>
	<view>
		<view class="drive-history_wrapper">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#fff"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="chart-wrapper">
						<view class="chart-date">
							<text>1日</text>
							<text>2日</text>
							<text>3日</text>
							<text>4日</text>
							<text>5日</text>
							<text>6日</text>
						</view>
						<view class="chart-column">
							<view class="chart-column_item"
								:style="{
									height: initHeight('d', 50)
								}"
							></view>
							<view class="chart-column_item"></view>
							<view class="chart-column_item"></view>
							<view class="chart-column_item"></view>
							<view class="chart-column_item"></view>
							<view class="chart-column_item"></view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					选项卡2的内容
				</view>
				<view v-show="current === 2">
					选项卡3的内容
				</view>
				<view v-show="current === 3">
					选项卡3的内容
				</view>
			</view>
		</view>
		<view class="drive-history-text_wrapper">
			<view class="text_upper">
				<view class="text-title">
					3 月, 骑行总距离
				</view>
				<view class="text-title">
					(公里)
				</view>
			</view>
			<view class="text_middle">
				60km
			</view>
			<view class="text_bottom">
				<view class="text_bottom_wrapper">
					<view class="text-title text_bottom_item">完成(次)</view>
					<view class="text-title text_bottom_item">消耗(千卡)</view>
				</view>
				<view class="text_bottom_wrapper">
					<view class="text-value text_bottom_item">1</view>
					<view class="text-value text_bottom_item">52</view>
				</view>
			</view>
			<view class="text_bottom">
				<view class="text_bottom_wrapper">
					<view class="text-title text_bottom_item">累计用时</view>
					<view class="text-title text_bottom_item">平均时速</view>
				</view>
				<view class="text_bottom_wrapper">
					<view class="text-value text_bottom_item">00:02:30</view>
					<view class="text-value text_bottom_item">28</view>
				</view>
			</view>
			<view class="uni-common-mt">
				<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="showRoute">开始骑行</button>
			</view>
		</view>
	</view>
</template>

<script>
	const sdkwx = uni.requireNativePlugin('AMap-NavSdkWX');
	var navi = uni.requireNativePlugin('AMap-Navi');
	export default {
		data() {
			return {
				current: 0,
				items: ["日", "周", "月"],
				dayMax: 100,
				weekMax: 100,
				monthMax: 100,
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
			onClickItem(e) {
				this.current = e.currentIndex;
			},
			initHeight(type, num) {
				const base = 300;
				let res = 0;
				switch(type) {
					case "d": 
					res = (num / this.dayMax) * base;
					break;
					case "w": 
					res = (num / this.weekMax) * base;
					break;
					case "m": 
					res = (num / this.monthMax) * base;
					break;
				}
				return res + "rpx";
			},
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
	.drive-history_wrapper {
		background-color: #564E5D;
		.content {
			width: 630rpx;
			margin: 0 auto;
			padding-top: 50rpx;
			.chart-wrapper {
				.chart-date {
					display: flex;
					justify-content: space-around;
					color: #98949D;
					padding-bottom: 20rpx;
				}
				.chart-column {
					display: flex;
					justify-content: space-around;
					height: 300rpx;
					align-items: flex-end;
					.chart-column_item {
						width: 30rpx;
						background-image: linear-gradient(#B3844E, #686159);
						border-radius: 20rpx 20rpx 0 0;
						height: 300rpx;
					}
				}
			}
		}
	}
	.drive-history-text_wrapper {
			width: 630rpx;
			margin: 0 auto;
			padding-top: 50rpx;
			.text_upper {
				display: flex;
				justify-content: space-between;
			}
			.text-title {
				font-size: 12rpx;
				color: $uni-font-color-black;
			}
			.text_middle {
				text-align: center;
				font-size: 100rpx;
				color: $uni-color-botton;
			}
			.text_bottom {
				.text_bottom_wrapper {
					display: flex;
					justify-content: space-between;
					.text_bottom_item {
						width: 150rpx;
						text-align: center;
					}
					.text-value {
						font-size: 40rpx;
						color: $uni-text-color-normal;
					}
				}
			}
	}
	.book-btn {
		background-color: $uni-color-botton;
		border-radius: 30px;
	}
	.book-btn-hover {
		background-color: #fd5841;
	}
</style>
