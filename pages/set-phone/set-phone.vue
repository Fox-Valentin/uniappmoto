<template>
	<view>
		<uni-list>
			<uni-list-item class="get-code_wrapper">
				<template slot="header">
					<uni-easyinput type="number" class="input-wrapper" trim="all" :inputBorder="false" placeholder="手机号:"></uni-easyinput>
				</template>
				<template slot="footer">
					<view class="get-code">获取验证码</view>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<uni-easyinput type="number" trim="all" class="input-wrapper" :inputBorder="false" placeholder="验证码:"></uni-easyinput>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="book-btn" hover-class="book-btn-hover">立即预约</button>
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

<style scoped lang="scss">
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
	.input-wrapper {
		font-size: 15px;
		flex: 2;
			/deep/ .uni-easyinput__content-input {
				padding: 0!important;
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
