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
	</view>
</template>

<script>
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
	
</style>
