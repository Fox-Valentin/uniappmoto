<template>
	<view class="uni-card uni-card--full">
		<!-- 标题 -->
		<view class="uni-card__head-padding">
			<view class="uni-card__title">
				<view class="uni-card__title-box">
					<view class="uni-card__title-header">
						<image class="uni-card__title-header-image" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" mode="scaleToFill" />
					</view>
					<view class="uni-card__title-content">
						<text class="uni-card__title-content-title uni-ellipsis">{{ '标题内容' }}</text>
						<text class="uni-card__title-content-extra uni-ellipsis">{{ '副标题' }}</text>
					</view>
				</view>
				<view v-show="!isJoin" @tap="joinGroup">
					<text class="uni-card__header-extra-text">加入社群</text>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="uni-card__content uni-border-bottom" @click.stop="clickCard">
			<view>
				<view class="image-box">
					<image class="image" mode="aspectFill"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg" />
				</view>
				<view class="content-box">
					<text class="content-box-text">标题卡片带有一个双标题头部，右侧为额外描述信息 ，内容可自定义实现</text>
				</view>
				<view class="bottom-box">
					<view class="u-f-ac" >
						<text class="content-box-text bottom-text">2人赞过</text>
						<text @tap.stop="clickComent" class="content-box-text bottom-text">查看全部评论</text>
					</view>
					<view class="u-f-ac heart-list">
						<block v-for="(item,index) in heartList" :key="index">
							<view class="heart-header">
								<image class="heart-header-image" :src="item" mode="scaleToFill" />
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="uni-card__footer">
			<view class="footer-box">
				<view class="footer-box__item" @click.stop="footerClick('评论')"><uni-icons type="chat" size="12"></uni-icons><text>评论</text></view>
				<view class="footer-box__item" @click.stop="footerClick('喜欢')"><uni-icons type="heart" size="12"></uni-icons><text>喜欢</text></view>
				<view class="footer-box__item" @click.stop="footerClick('分享')"><uni-icons type="pengyouquan" size="12"></uni-icons><text>分享</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				isJoin: this.item.isJoin,
				heartList: [
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
				]
			}
		},
		methods: {
			joinGroup() {
				this.isJoin = true;
				uni.showToast({
					title: '加入成功',
				});
			},
			clickCard() {
				uni.showToast({
					title: '点击卡片',
					icon: 'none'
				})
			},
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				})
			},
			clickComent() {
				uni.showToast({
					title: '查看评论',
					icon: 'none'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 380rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding: 20rpx;
	}

	.content-box-text {
		font-size: 12px;
		line-height: 22px;
	}
	
	.bottom-box {
		padding: 10rpx 20rpx;
	}
	
	.bottom-text {
		padding: 0 14upx 14upx 0;
		color: $uni-text-color-grey;
	}
	
	.heart-list {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: baseline;
	}
	
	.heart-header {
		width: 50upx;
		height: 50upx;
		overflow: hidden;
		margin: 0 14upx 14upx 0;
	}
	
	.heart-header-image {
		width: 50upx;
		height: 50upx;
		border-radius: 25upx;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: flex-start;
		flex-direction: row;
	}

	.footer-box__item {
		display: flex;
		align-items: center;
		padding: 2px 8px;
		font-size: 12px;
		color: $uni-text-color-grey;
		.uni-icons {
			margin-right: 8upx;
		}
	}
	
	.uni-border {
		position: relative;
		/* #ifdef APP-NVUE */
		border-color: $uni-border-color;
		border-style: solid;
		border-width: 0.5px;
		/* #endif */
		z-index: 1;
	}
	
	/* #ifndef APP-NVUE */
	.uni-border:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border: 1px solid $uni-border-color;
		border-radius: 10px;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}
	
	/* #endif */
	
	.uni-border-bottom {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		/* #endif */
		z-index: 1;
	}
	
	/* #ifndef APP-NVUE */
	.uni-border-bottom:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border-bottom: 1px solid $uni-border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}
	
	/* #endif */
	.uni-border-top {
		position: relative;
		/* #ifdef APP-NVUE */
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
		z-index: 1;
	}
	
	/* #ifndef APP-NVUE */
	.uni-border-top:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border-top: 1px solid $uni-border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}
	
	/* #endif */
	
	.uni-card__thumbnailimage {
		position: relative;
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		height: 150px;
		background-color: #F1F1F1;
		overflow: hidden;
	}
	
	.uni-card__thumbnailimage-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		height: 150px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	
	.uni-card__thumbnailimage-image {
		flex: 1;
	}
	
	.uni-card__thumbnailimage-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		flex-direction: row;
		padding: $uni-spacing-col-base $uni-spacing-col-lg;
		background-color: $uni-bg-color-mask;
	}
	
	.uni-card__thumbnailimage-title-text {
		flex: 1;
		font-size: $uni-font-size-base;
		color: #fff;
	}
	
	.uni-card__title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 10px;
	
	}
	
	.uni-card__title-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}
	
	.uni-card__title-header {
		width: 40px;
		height: 40px;
		overflow: hidden;
		border-radius: 5px;
		padding-right: 10px;
	}
	
	.uni-card__title-header-image {
		width: 40px;
		height: 40px;
		border-radius: 20px;
	}
	
	.uni-card__title-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		flex: 1;
		height: 40px;
		overflow: hidden;
	}
	
	.uni-card__title-content-title {
		font-size: $uni-font-size-base;
		line-height: 22px;
	}
	
	.uni-card__title-content-extra {
		font-size: $uni-font-size-sm;
		line-height: 27px;
		color: $uni-text-color-grey;
	}
	
	.uni-card__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: relative;
		flex-direction: row;
		padding: $uni-spacing-col-lg;
		align-items: center;
	}
	
	.uni-card__header-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-right: $uni-spacing-col-base;
		justify-content: flex-start;
		align-items: center;
	}
	
	.uni-card__header-title-text {
		font-size: $uni-font-size-lg;
		flex: 1;
		color: #333;
	}
	
	.uni-card__header-extra-img {
		height: $uni-img-size-sm;
		width: $uni-img-size-sm;
		margin-right: $uni-spacing-col-base;
	}
	
	.uni-card__header-extra-text {
		flex: 1;
		margin-left: $uni-spacing-col-base;
		font-size: $uni-font-size-sm;
		text-align: right;
		color: #fff;
		background-color: $uni-color-botton;
		border-radius: 20upx;
		padding: 4upx 12upx;
	}
	
	.uni-card__content {
		color: $uni-text-color;
	}
	
	.uni-card__content--pd {
		padding: $uni-spacing-col-lg;
	}
	
	.uni-card__content-extra {
		font-size: $uni-font-size-base;
		padding-bottom: 10px;
		color: $uni-text-color-grey;
	}
	
	.uni-card__footer {
		justify-content: space-between;
		padding: $uni-spacing-col-sm;
	}
	
	.uni-card__footer-text {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
	}
	
	.uni-card--shadow {
		position: relative;
		/* #ifndef APP-NVUE */
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
		/* #endif */
	}
	
	.uni-card--full {
		margin: 0;
		border-radius: 0;
	}
	
	/* #ifndef APP-NVUE */
	.uni-card--full:after {
		border-radius: 0;
	}
	
	/* #endif */
	.uni-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}
	
	.uni-card__head-padding {
		// mar: 12px;
	}
</style>
