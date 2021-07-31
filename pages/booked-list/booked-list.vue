<template>
	<view>
		<uni-card 
		v-for="(item,index) in list"
		:title="item.activityTitle" 
		:extra="'预约者:' + item.contactName" 
		isShadow 
		:note="item.remark" 
		@click="clickCard(item.id)">
			<view class="content-box">
				开始时间: {{item.startReservedTime}}
			</view>
			<view class="content-box">
				结束时间: {{item.endReservedTime}}
			</view>
			<view class="content-box">
				人数: {{item.memberCount}}
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				this.$http.get("/api/app/api/appointment/list").then(data => {
					this.list = data;
				})
			},
			clickCard(id) {
				uni.navigateTo({
					url: `/pages/booking-result/booking-result?id=${id}`
				})
			},
		}
	}
</script>

<style>

</style>
