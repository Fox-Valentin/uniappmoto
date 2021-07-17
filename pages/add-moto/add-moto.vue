<template>
	<view>
		<view class="forms-wrapper">
			<uni-forms>
				<uni-forms-item :labelWidth="100" label="品牌:"  name="name">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入姓名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="型号:"  name="age">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入型号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="车牌号:"  name="name">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入车牌号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="其他参数:"  name="age">
					<uni-easyinput :inputBorder="false"  class="form-item" placeholder="请输入其他参数"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
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
	.forms-wrapper {
		border-top: 6px solid $uni-page-bg-color;
		padding-left: 30rpx;
		padding-top: 30rpx;
		/deep/ .label-text {
			font-size: 16px;
			color: $uni-text-color-normal;
		}
		/deep/ .uni-input-placeholder {
			color: $uni-font-color-grey;
		}
	}
	.form-item {
	}
	</style>
