<template>
	<view>
		<view class="booking-tips_wrapper">
			<view class="booking-tips">
				<text class="booking-tips_title">温馨提示：</text>
				<text>如果忘记，可以直接出示给工作人员哦</text>
			</view>
		</view>
		<view class="booking-result">
			<view class="booking-qr">
				<view class="booking-qr_wrapper">
					<image class="booking-qr_img" src="../../static/demo/userpic/qr.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">预约电话</text>
				<text class="booking-item_text">17190418587</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">业务名称</text>
				<text class="booking-item_text">篮球场预约</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">预约时间</text>
				<text class="booking-item_text">2021-04-01 10:30:00</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">状态</text>
				<text class="booking-item_text">未使用</text>
			</view>
		</view>
		<view class="booking-result-btns">
			<view class="booking-result-btn_cancel">取 消 预 约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $uni-page-bg-color;
	}
</style>
<style scoped lang="scss">
	.booking-result {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 600rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 30px;
		box-sizing: border-box;
		padding: 20px 20px;
		margin-top: 20px;
	}
	.booking-item {
		display: flex;
		justify-content: space-between;
		width: 550rpx;
		margin-top: 20px;
		.booking-item_title {
			font-size: 18px;
			color:#868585;
		}
		.booking-item_text {
			color: $uni-font-color-grey;
			font-weight: bold;
		}
	}
	.booking-result-btns {
		display: flex;
		justify-content: center;
		margin-top: 40px;
		.booking-result-btn_cancel {
			background-color: #C0C0C0;
			color: #FFFFFF;
			width: 600rpx;
			text-align: center;
			font-size: 20px;
			border-radius: 20px;
			padding-bottom: 4px;
			padding-top: 4px;
		}
	}
	.booking-qr {
		line-height: 1;
		background: url(../../static/demo/userpic/qr-bg.png) no-repeat center center;
		width: 500rpx;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.booking-qr_img {
			width: 280rpx;
			background-color: #FFFFFF;
		}
	}
	.booking-tips_wrapper {
		background-color: #FFFFFF;
		border-top: 1px solid #f7f5f5;
		font-size: 14rpx;
		padding-top: 10px;
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.booking-tips {
		color: $uni-text-color-normal;
		.booking-tips_title {
			color: #FC9186;
		}
	}
</style>
