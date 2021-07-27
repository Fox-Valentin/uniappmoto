<template>
	<view>
		<view class="booking-result">
			<view class="booking-qr">
				<tki-qrcode
					ref="qrcode"
					:val="val"
					:size="size"
					:unit="unit"
					:background="background"
					:foreground="foreground"
					:pdground="pdground"
					:icon="icon"
					:iconSize="iconsize"
					:loadMake="loadMake"
					:loadingText="loadingText"
					@result="qrR" />
			</view>
			<view class="booking-item">
				<text class="booking-item_title">八戒是条狗</text>
				<text class="booking-item_text">调皮捣蛋小可爱</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">扫一扫加我好友吧</text>
			</view>
		</view>
		<view class="booking-result-btns">
			<view class="booking-result-btn_save" @click="save">
				<view class="btn_icon">
					<uni-icons type="download" size="30" color="#fff"></uni-icons>
				</view>
				<view class="btn_text">保存到相册</view>
			</view>
			<view class="booking-result-btn_scan" @click="scan">
				<view class="btn_icon">
					<uni-icons type="scan" size="30" color="#fff"></uni-icons>
				</view>
				<view class="btn_text">扫一扫</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" style="color: #FFFFFF;">
			{{ resultText }}
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: '二维码', // 要生成的二维码值
				size: 260, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000', // 前景色
				pdground: '#C12E19', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				src: '' ,// 二维码生成后的图片地址或base64
				loadMake: true,
				loadingText: "加载中",
				resultText: "resultText",
			}
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.src,
					success: () => {
						console.log('save success');
					}
				});
			},
			scan() {
				uni.scanCode({
				    onlyFromCamera: true,
				    success: (res) => {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						this.resultText = res.scanType + " " + res.result;
						// QR_CODE 二维码
						this.$refs.popup.open()
				    }
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #1A1A26;
	}
</style>
<style lang="scss" scoped>
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
		margin-top: 20rpx;
	}
	.booking-qr {
		line-height: 1;
		// background: url(../../static/demo/userpic/qr-bg.png) no-repeat center center;
		width: 500rpx;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(../../static/demo/userpic/qr-bg.png);
		background-repeat: no-repeat;
		background-position-x: -5rpx;
		background-position-y: -18rpx;
		background-size: contain;
	}
	.booking-item {
		width: 550rpx;
		margin-top: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		.booking-item_title {
			font-size: 22px;
			color:#000;
		}
		.booking-item_text {
			color: $uni-font-color-dark-black;
			font-size: 18px;
		}
	}
	.booking-result-btns {
		display: flex;
		justify-content: space-around;
		color: #FFFFFF;
		padding-top: 60rpx;
		.btn_text {
			font-size: 20px;
		}
		.btn_icon {
			text-align: center;
		}
	}
</style>
	