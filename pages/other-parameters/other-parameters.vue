<template>
	<view>
		<view class="forms-wrapper">
			<uni-forms>
				<uni-forms-item :labelWidth="120" label="轴距:"  name="name">
					<uni-easyinput :styles="{color:'#B0B0B0'}" :clearable="false" :inputBorder="false" class="form-item" placeholder="请输入轴距"></uni-easyinput>
					<view class="unit">mm</view>
				</uni-forms-item>
				<uni-forms-item :labelWidth="120" label="离地间隙:"  name="age">
					<uni-easyinput :styles="{color:'#B0B0B0'}" :clearable="false" :inputBorder="false" class="form-item" placeholder="请输入离地间隙"></uni-easyinput>
					<view class="unit">mm</view>
				</uni-forms-item>
				<uni-forms-item :labelWidth="120" label="座高:"  name="name">
					<uni-easyinput :styles="{color:'#B0B0B0'}" :clearable="false" :inputBorder="false" class="form-item" placeholder="请输入座高"></uni-easyinput>
					<view class="unit">mm</view>
				</uni-forms-item>
				<uni-forms-item :labelWidth="120" label="整备质量(湿重):"  name="age">
					<uni-easyinput :styles="{color:'#B0B0B0'}" :clearable="false" :inputBorder="false"  class="form-item" placeholder="请输入其他参数"></uni-easyinput>
					<view class="unit">kg</view>
				</uni-forms-item>
				<uni-forms-item :labelWidth="120" label="邮箱容量:"  name="name">
					<uni-easyinput :styles="{color:'#B0B0B0'}" :clearable="false" :inputBorder="false" class="form-item" placeholder="请输入邮箱容量"></uni-easyinput>
					<view class="unit">升</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="book-btn" hover-class="book-btn-hover">保存</button>
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
		/deep/ .uni-forms-item__content {
			display: flex;
			align-items: center;
		}
		.unit {
			color: $uni-font-color-black;
			padding-right: 20px;
			padding-left: 10px;
		}
		/deep/ .uni-input-wrapper {
			text-align: right;
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
