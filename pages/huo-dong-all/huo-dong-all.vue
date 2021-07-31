<template>
	<view>
		<uni-list>
			<uni-list-item 
			v-for="(item,index) in list"
			:title="item.title" 
			:note="item.remark"
			:thumb="item.pic"
			thumb-size="lg"
			:rightText="item.businessHours"
			link
			@click="huoDongDetail(item.id)"
			>
				
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				this.$http.get("/api/app/api/activity/list").then(result => {
					this.list = result.rows;
				})
			},
			huoDongDetail(id) {
				uni.navigateTo({
					url: `/pages/huo-dong-detail/huo-dong-detail?id=${id}`
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/booking/booking?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.footer-box {
		display: flex;
		justify-content: space-between;
	}
</style>
