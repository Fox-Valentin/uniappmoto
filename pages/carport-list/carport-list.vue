<template>
	<view>
		<uni-list>
			<uni-list-item v-for="num in 10">
				<template slot="header">
					<view class="img-wrapper">
						<image src="../../static/bgimg/1.jpg" mode="widthFix" class="img"></image>
					</view>
				</template>
				<template slot="body">
					<view class="desc-wrapper">
						<view class="desc">Top01</view>
						<view class="desc">新大洲本田CM300</view>
						<view class="license">车牌号CM300</view>	
					</view>
				</template>
			</uni-list-item>
		</uni-list>
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
	.img-wrapper {
		.img {
			height: 150rpx !important;
			width: 150rpx;
		}
	}
	.desc-wrapper {
		display: flex;
		justify-content: end;
		align-items: start;
		flex-direction: column;
		padding-left: 30rpx;
		.desc {
			font-size: 16px;
			font-weight: bold;
			color: $uni-text-color-normal;
		}
		.license {
			font-size: 12px;
			color: $uni-font-color-black;
		}
	}
</style>
