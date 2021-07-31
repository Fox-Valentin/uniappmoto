<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item, index) in list" clickable  @click="toDetail(item.id)">
				<template slot="header">
					<view class="img-wrapper">
						<image :src="handlePic(item.pic)" mode="widthFix" class="img"></image>
					</view>
				</template>
				<template slot="body">
					<view class="desc-wrapper">
						<view class="desc">Top{{index + 1}}</view>
						<view class="desc">{{item.brand}}</view>
						<view class="license">{{ item.type }}</view>	
					</view>
				</template>
				<template slot="footer">
					<view class="footer-wrapper">
						<text class="" @click.stop="deletCar(item.id)">
							
						<uni-icons type="trash" color="#FF7663"></uni-icons>
						</text>
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
				list: [],
				picDefault: "../../static/demo/bentian.png",
			}
		},
		onLoad() {
			this.initList();
		},
		methods: {
			initList() {
				this.$http.get("/api/app/api/user/moto/list").then(data => {
					this.list = data.rows;
				})
			},
			handlePic(picStr) {
				if(!picStr || picStr.length <= 0) {
					return this.picDefault;
				} else {
					let res = this.picDefault;
					try{
						res = picStr.split(",")[0];
					}catch(e){
						//TODO handle the exception
					}
					return res;
				}
			},
			toDetail(id) {
				uni.navigateTo({
					url: `/pages/add-moto/add-moto?id=${id}`,
				})
			},
			deletCar(id) {
				uni.showModal({
					title: "提示",
					content: "是否删除?",
					success: ({confirm, cancel}) => {
						if(confirm) {
							this.$http.delete(`/api/app/api/user/moto/${id}`).then(res => {
								uni.showToast({
									title:"删除成功",
									icon:"none"
								})
								this.initList();
							})
						}
					}
				})
			},
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
	.footer-wrapper {
		flex: 1;
		text-align: right;
	}
</style>
