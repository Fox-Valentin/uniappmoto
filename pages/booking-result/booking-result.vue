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
			<tki-qrcode
				v-if="showQr"
				ref="qrcode"
				:val="detail.id"
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
				<text class="booking-item_title">预约电话</text>
				<text class="booking-item_text">{{detail.phone}}</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">业务名称</text>
				<text class="booking-item_text">{{detail.activityTitle}}</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">开始时间</text>
				<text class="booking-item_text">{{detail.startReservedTime}}</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">开始时间</text>
				<text class="booking-item_text">{{detail.endReservedTime}}</text>
			</view>
			<view class="booking-item">
				<text class="booking-item_title">状态</text>
				<text class="booking-item_text">{{ status }}</text>
			</view>
		</view>
		<view class="booking-result-btns">
			<view class="booking-result-btn_cancel" @click="cancelYuyue">取 消 预 约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				detail: {},
				val: '123', // 要生成的二维码值
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
				showQr: false,
			}
		},
		onLoad(option) {
			// 判断是否携带id参数判断是否编辑
			if(option.id) {
				this.id = option.id;
				// 回填数据
				this.getDetail();
			}
		},
		computed: {
			status() {
				let res = "未使用";
				switch(this.detail.useless) {
					case "0":
					res = "未使用"
					break;
					case "1":
					res = "已使用"
					break;
					case "2":
					res = "已取消"
					break;
				}
				return res;
			},
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			getDetail() {
				this.$http.get(`/api/app/api/appointment/${this.id}`).then(data => {
					this.detail = data;
					this.showQr = true;
				})
			},
			cancelYuyue() {
				if(this.detail.useless != "0") {
					uni.showToast({
						title: "预约无法取消",
						icon:"none"
					})
					return;
				}
				uni.showModal({
					content: '是否取消预约？',
					cancelText: '否',
					confirmText: '是',
					success: res => {
						if (res.confirm) {
							this.$http.put(`/api/app/api/appointment/cancel/${this.detail.id}`).then(res => {
								uni.showToast({
									title: "取消预约成功",
									icon:"none"
								})
								this.getDetail()
							})
						} else {
						}
					},
				});
			}
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
