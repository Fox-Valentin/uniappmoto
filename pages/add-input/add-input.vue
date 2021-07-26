<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar :statusBar="true" rightText="保存草稿" title="新动态" left-icon="back" @click-left="back"
			@click-right="baocun">
		</uni-nav-bar>
		<!-- 多行输入框 -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="填写你的生活life吧~" />
		</view>
		<!-- 上传多图 -->
		<uploud-images @uploud="uploud"></uploud-images>
		<uni-list>
			<uni-list-item :show-extra-icon="true" :extra-icon="topic" link title="添加话题" rightText="选择合适的话题会有更多赞哦~">
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" :extra-icon="location" link :title="locationAddress" @click="onClickMap">
			</uni-list-item>
		</uni-list>
		<!-- <view class="u-f-ajc" @tap="changelook">
			{{yinsi}}
			<view class="icon iconfont icon-xialazhankai"></view>
		</view> -->
		<view class="u-f-ac bottom-tag">
			<view class="u-f-ac bottom-tag-item" @tap="changelook">
				{{yinsi}}
				<uni-icons type="arrowdown" size="14"></uni-icons>
			</view>
			<view class="u-f-ac bottom-tag-item" :class="{'active': checked}" @tap="save">
				保存到相册
				<uni-icons type="checkbox-filled" :color="checkColor" size="14"></uni-icons>
			</view>
		</view>
		<!-- 弹出公告 -->
		<!-- 		<uni-popup :show="showpopup" position="middle" mode="fixed" @hidePopup="hidePopup">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view>1.涉及黄色，政治，广告及骚扰信息</view>
				<view>2.涉及黄色，政治，广告及骚扰信息</view>
				<view>3.涉及黄色，政治，广告及骚扰信息</view>
				<view>4.涉及黄色，政治，广告及骚扰信息</view>
				<button type="default" @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup> -->

	</view>
</template>

<script>
	let changelook = ['公开', '仅自己'];
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	import uploudImages from "../../components/common/uploud-images.vue";
	// import uniPopup from "../../components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniNavBar,
			uploudImages,
			// uniPopup
		},
		data() {
			return {
				isget: false,
				showpopup: true,
				yinsi: "公开",
				text: "",
				imglist: [],
				location: {
					type: 'location',
					color: '#333',
					size: 18
				},
				topic: {
					type: 'chat',
					color: '#333',
					size: 18
				},
				checked: false,
				checkColor: '#333',
				locationAddress: '你在哪里'
			};
		},
		onBackPress() {
			// 如果有值
			if (!this.text && this.imglist.length < 1) {
				return;
			}
			if (!this.isget) {
				this.baocun();
				return true;
			}
		},
		methods: {
			// 保存为草稿
			baocun() {
				uni.showModal({
					content: '是否要保存为草稿？',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm) {
							console.log("保存")
						} else {
							console.log("不保存")
						}
						this.isget = true;
						uni.navigateBack({
							delta: 1
						});
					},
				});
			},
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 发布
			submit() {
				console.log("发布")
			},
			// 隐私
			changelook() {
				uni.showActionSheet({
					itemList: changelook,
					success: (res) => {
						this.yinsi = changelook[res.tapIndex]
					}
				});
			},
			uploud(arr) {
				this.imglist = arr;
				console.log(this.imglist)
			},
			hidePopup() {
				this.showpopup = false;
			},
			save() {
				this.checked = !this.checked;
				this.checkColor = this.checked ? '#007aff' : '#333'
			},
			onClickMap() {
				uni.chooseLocation({
					success: (res) => {
						//let location = [res.longitude, res.latitude];
						this.locationAddress = res.address
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-textarea uni-textarea {
		width: auto;
		padding: 22upx 30upx;
	}

	.bottom-tag-item {
		background-color: #eee;
		border-radius: 30upx;
		padding: 0 14upx;
		font-size: 24upx;
		height: 40upx;
		line-height: 40upx;

		.uni-icons {
			margin-left: 3upx;
		}
	}

	.bottom-tag {
		padding: 22upx 30upx;
		justify-content: space-between;

		.active {
			color: #007aff;
		}
	}

	.gonggao {
		width: 500upx;
	}

	.gonggao image {
		width: 75%;
		margin-bottom: 20upx;
	}

	.gonggao button {
		margin-top: 20upx;
		background: #FFE934;
		color: #171606;
	}
</style>
