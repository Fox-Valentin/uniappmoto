<template>
	<view class="set-list">
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :title="item.title" link :to="item.url" :class="item.class"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						"title": "账号管理",
						"url": "#"
					},
					{
						"title": "骑行历史",
						"url": "#"
					},
					{
						"title": "我的订单",
						"url": "#"
					},
					{
						"title": "草稿箱",
						"url": "#"
					},
					{
						"title": "我的车库",
						"url": "#"
					},
					{
						"title": "救援服务",
						"url": "#"
					},
					{
						"title": "在线改装",
						"url": "#"
					},
					{
						"title": "我的二维码",
						"url": "#"
					},
					{
						"title": "违章查询",
						"url": "#"
					},
					{
						"title": "关于",
						"url": "#"
					},
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.set-list {
		padding-top: 30rpx;
	}
	page {
		background-color: #FBFBFB;
	}
</style>
