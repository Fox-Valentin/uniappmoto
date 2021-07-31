<template>
	<view class="uni-list">
		<block v-for="item in listData" :key="item.id">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(item)">
				<view class="uni-info-list" v-if="item.displayMode === 1">
					<view class="uni-info-list-title uni-ellipsis-1"><text decode="true">{{ item.title }}</text></view>
					<view v-if="item.titleImg.length === 1" class="uni-info-list-bottom">
						<image class="uni-info-list-image-bottom" :src="item.titleImg[0]"></image>
					</view>
					<view v-else class="uni-info-list-bottom">
						<block v-for="(img,index) in item.titleImg" :key="index">
							<image class="uni-info-list-image-bottom3" :src="img"></image>
						</block>
					</view>
				</view>
				<view class="uni-info-list row" v-else>
					<view class="uni-info-list-body">
						<view class="uni-info-list-title uni-ellipsis-1"><text decode="true">{{ item.title }}</text></view>
						<view class="uni-info-list-text-bottom uni-ellipsis-3">
							<text>{{ item.synopsis }}</text>
						</view>
					</view>
					<image class="uni-info-list-image-right" :src="item.titleImg[0]"></image>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default: []
			}
		},
		methods: {
			goDetail(data) {
				uni.navigateTo({
					url: '../../pages/index/index-info?id=' + data.id
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.uni-info-list {
		padding: 11px 15px;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.row {
		flex-direction: row;
	}

	.uni-info-list-image-bottom {
		width: 100%;
		height: 320rpx;
		border-radius: 10rpx;
	}

	.uni-info-list-image-bottom {
		width: 100%;
		height: 320rpx;
		border-radius: 10rpx;
	}

	.uni-info-list-image-bottom3 {
		width: 33%;
		height: 220rpx;
		border-radius: 20rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
	}

	.uni-info-list-image-right {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}

	.uni-info-list-body {
		height: auto;
		justify-content: space-around;
		flex: 1;
		padding-right: 10rpx;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.uni-ellipsis-3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.uni-info-list-title {
		font-size: 28rpx;
		font-weight: bold;
	}

	.uni-info-list-text-bottom {
		font-size: 22rpx;
		color: $uni-font-color-grey;
	}
</style>
