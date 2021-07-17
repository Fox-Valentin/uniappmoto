<template>
	<view>
		<uni-list>
			<uni-list-item title="预约日期" link>
				<template slot="footer">
					<uni-datetime-picker class="picker" v-model="date" :border="false" />
				</template>
			</uni-list-item>
			<uni-list-item title="人数" link>
				<template slot="footer">
					<uni-number-box :min="0" :max="9"></uni-number-box>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<uni-easyinput class="input-wrapper" trim="all" :inputBorder="false" placeholder="请输入联系人姓名"></uni-easyinput>
				</template>
				<template slot="footer">
					<view>
						<radio-group class="radio-group_wrapper">
							<label class="radio"><radio color="#FF7663" value="r1" checked="true"  />女士</label>
							<label class="radio"><radio color="#FF7663" value="r2"  style="margin-left: 30rpx;"/>先生</label>
						</radio-group>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="get-code_wrapper">
				<template slot="header">
					<uni-easyinput type="number" class="input-wrapper" trim="all" :inputBorder="false" placeholder="联系电话"></uni-easyinput>
				</template>
				<template slot="footer">
					<view class="get-code">获取验证码</view>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<uni-easyinput type="number" trim="all" class="input-wrapper" :inputBorder="false" placeholder="请输入验证码"></uni-easyinput>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="book-btn" hover-class="book-btn-hover">立即预约</button>
			<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="toggle('center')">222</button>
		</view>
		<view class="">
			<uni-popup ref="popup" background-color="#fff">
				<view class="booking-success">
					<view class="booking-date">2021-04-03</view>
					<view class="booking-time">
						<text>上午</text>
						<text>10:30</text>
					</view>
					<view class="booking-list">
						<view class="booking-item">记得按照时间早点来哦</view>
						<view class="booking-item">优惠就能提前知道呢</view>
					</view>
					<view class="booking-btns">
						<view class="booking-btn_cancel">取消</view>
						<view class="booking-btn_ok">取消</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: null,
			}
		},
		methods: {
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
		}
	}
</script>

<style scoped lang="scss">
	.picker {
		/deep/ .uni-date__input {
			height: 26px;
			width: 100%;
			padding: 0 8px;
			line-height: 40px;
			font-size: 14px;
			text-align: right;
			padding: 0;
		}
		/deep/ .uni-date__icon-logo {
			display: none;
		}
		/deep/ .uni-date-x {
			padding: 0;
		}
	}
	.input-wrapper {
		font-size: 15px;
		flex: 2;
			/deep/ .uni-easyinput__content-input {
				padding: 0!important;
			}
	}
	/deep/ .uni-radio-input{
		    appearance: none;
		    margin-right: 5px;
		    outline: 0;
		    border: 1px solid #d1d1d1;
		    background-color: #fff;
		    border-radius: 50%;
		    width: 14px;
		    height: 14px;
		    position: relative;
	}
	.radio-group_wrapper /deep/ .uni-radio-input-checked:before {
		font-size: 14px;
	}
	.get-code {
		background-color: $uni-color-botton;
	    color: #fff;
	    padding: 0 8px;
	    border-radius: 4px;
	    font-size: 12px;
	    line-height: 24px;
	    height: 24px;
	}
	.get-code_wrapper {
		/deep/ .uni-list-item__container {
			align-items: center;
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
