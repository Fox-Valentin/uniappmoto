<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<!-- <uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more> -->
			<view v-if="!loading" class="label-content">
				<view class="label-content__item" v-for="(item,index) in labelList" :key="item.tagId">
					{{item.tagName}}
					<uni-icons v-if="is_edit" class="icons-close" type="clear" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
				<view v-if="labelList.length === 0 && !loading" class="no-data">
					当前没有数据
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<!-- <uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more> -->
			<view v-if="!loading" class="label-content">
				<view class="label-content__item" v-for="(item,index) in list" :key="item.tagId" @click="add(index)">{{item.tagName}}</view>
			</view>
			<view v-if="list.length === 0  && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: true
			}
		},
		onLoad() {
			// 自定义事件
			// this.$emit() 
			// 自定义事件，只能在打开的页面触发 
			this.getLabel()
		},
		methods: {
			editLabel() {
				// this.is_edit = !this.is_edit
				// true 正在编辑
				if (this.is_edit) {
					this.is_edit = false
					this.setUpdateLabel(this.labelList)
				} else {
					this.is_edit = true
				}
			},
			add(index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			setUpdateLabel(label) {
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item.tagId)
				})
				uni.showLoading()
				console.log(newArrIds);
				this.$http.post("/api/app/api/user/updateTags", newArrIds).then(res => {
					console.log(res)
					uni.hideLoading()
				})
			},
			getLabel() {
				this.loading = true
				try{
					this.labelList = this.$store.state.userinfo.tags;
				}catch(e){
					console.log(e)
				}
				this.$http.get("/api/app/api/user/notAssociatedTags").then(res => {
					this.loading = false
					this.list = res;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
						height: 40rpx;
						line-height: 1;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
