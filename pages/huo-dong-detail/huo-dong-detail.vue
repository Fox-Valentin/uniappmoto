<template>
	<view>
		<view class="">
			<uni-title type="h1" :title="detail.title"  align="center"></uni-title>
		</view>
		<view>
			<ls-swiper 
			:list="carouselPic" 
			imgKey="url" 
			:loop="true" 
			 :dots='true'
			:shadow='true' 
			/>
		</view>
		<view class="huodong-shortcut uni-common-mt">
			<view class="huodong-remark">
				小贴士: {{ detail.remark }}
			</view>
			<view class="huodong-businessHours">
				活动时间: {{ detail.businessHours }}
			</view>
			<rich-text :nodes="detail.content"></rich-text>
		</view>
			<view class="uni-common-mt btn-wrapper">
				<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="toYuyue">去预约</button>
			</view>
	</view>
</template>

<script>
	import lsSwiper from "../../components/ls-swiper/index.vue"
	export default {
		components:{
			lsSwiper,
		},
		data() {
			return {
				id: null,
				detail: {},
				carouselPic: [],
			}
		},
		onLoad(option) {
			// 判断是否携带id参数判断是否编辑
			if(option.id) {
				this.id = option.id;
				// 回填数据
				this.getDetail();
			}
		},
		methods: {
			getDetail() {
				this.$http.get(`/api/app/api/activity/${this.id}`).then(data => {
					this.detail = data;
					data.carouselPic.split(";").forEach(imgUrl => {
						this.carouselPic.push({
							url: imgUrl
						})
					});
				})
			},
			toYuyue() {
				uni.navigateTo({
					url: `/pages/booking/booking?id=${this.detail.id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.huodong-img-wrapper {
		display: flex;
	}
	.huodong-img-wrapper>image {
		flex: 1;
	}
	.huodong-shortcut {
		padding-left: 20rpx;
		color: $uni-font-color-black;
		.huodong-remark {
			
		}
		.huodong-businessHours{
			
		}
	}
	.book-btn {
		background-color: $uni-color-botton;
		border-radius: 30px;
	}
	.book-btn-hover {
		background-color: #fd5841;
	}
	.btn-wrapper {
		padding-left: 50rpx;
		padding-right: 50rpx;
	}
</style>
