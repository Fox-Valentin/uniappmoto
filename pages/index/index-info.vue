<template>
	<view>
		<view>
			<view class="article-title">
				<text decode="true">{{title}}</text>
			</view>
			<view class="article-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				title: '',
				htmlNodes: []
			};
		},
		onLoad(event) {
			this.getDetail(event.id);
		},
		methods: {
			getDetail(id) {
				this.$http.get(`/app/api/information/${id}`).then(data => {
					let htmlString = data.content.replace(/\\/g, "").replace(/<img/g,
						"<img mode=\"widthFix\" style=\"width: 100%\"");
					this.htmlNodes = htmlParser(htmlString);
					this.title = data.title;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.article-content {
		padding: 15rpx 30rpx;
		overflow: hidden;
		font-size: 28rpx;
	}
	
	.article-title {
		font-size: 32rpx;
		font-weight: bold;
		padding: 5rpx 30rpx;
	}
</style>
