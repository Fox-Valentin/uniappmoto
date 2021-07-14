<template>
	<view class="">
		<scroll-view  class="scroll-view_H" scroll-x="true">
			<view id="demo1" class="scroll-view-item_H guan-zhu_item" v-for="num in 10">
				<view class="image-wrapper">
					<image src="../../static/demo/userpic/11.jpg" mode="widthFix" lazy-load></image>
				</view>
				<view class="title">
					篮球场
				</view>
				<view class="yuyue">
					预约
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background-color: $uni-bg-color-grey;
		box-sizing: border-box;
		padding-left: 30rpx;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 211rpx;
		height: 316rpx;
		line-height: 300rpx; 
		text-align: center;
		font-size: 36rpx;
		margin-right: 6px;
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
		margin-right: 15upx;
	}
	.title {
		color: $uni-text-color-normal;
		font-size: 14px;
		font-weight: bold;
		white-space: break-spaces;
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
