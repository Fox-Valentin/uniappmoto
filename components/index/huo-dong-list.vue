<template>
	<view class="">
		<view class="scroll-view_H">
			<view id="demo1" class="scroll-view-item_H guan-zhu_item" v-for="item in list" :key="item.id">
				<view class="image-wrapper">
					<image :src="item.pic" lazy-load></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="yuyue" @click="toYuyue(item.id)">
					预约
				</view>
			</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		mounted() {
			this.initList();
		},
		methods: {
			initList() {
				this.$http.get("/api/app/api/activity/listSort").then(result => {
					this.list = result;
				})
			},
			toYuyue(id) {
				uni.navigateTo({
					url: `/pages/booking/booking?id=${id}`
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background-color: $uni-bg-color-grey;
		// box-sizing: border-box;
		// padding-left: 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: space-around;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 230rpx;
		height: 316rpx;
		line-height: 300rpx; 
		text-align: center;
		font-size: 36rpx;
		overflow: hidden;
	}
	.guan-zhu_item {
		background-color: #fff;
	}
	.image-wrapper>image{
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.title {
		color: $uni-text-color-normal;
		font-size: 14px;
		font-weight: bold;
		overflow: hidden;
		text-align: center;
		margin-left: 16px;
		margin-right: 16px;
		box-sizing: border-box;
	}
	.yuyue {
		width: 60px;
		margin: 0 auto;
		font-size: 10px;
		color: #fff;
		background-color: #FF7663;
		border-radius: 20px;
		margin-top: 10px;
	}
</style>
