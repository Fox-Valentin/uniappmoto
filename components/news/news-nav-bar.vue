<template>
	<view>
		<uni-nav-bar :fixed="true" :statusBar="true" :border="false" @click-right="openAdd">
			<!-- 左边 -->
			<!-- <block slot="left">
				<view class="nav-left">
					<view class="icon iconfont icon-qiandao"></view>
				</view>
			</block> -->
			<!-- 中间 -->
			<view class="nav-tab-bar u-f-ajc">
				<block v-for="(tab,index) in tabBars" :key="tab.id">
					<view class="u-f-ajc" :class="{'active':tabIndex==index}" @tap="changeTab(index)">
						{{tab.name}}
						<view v-if="(tabIndex==index)" class="nav-tab-bar-line"></view>
					</view>
				</block>
			</view>
			<!-- 右边 -->
			<block slot="right">
				<view class="nav-right u-f-ajc">
					<uni-icons id="target" type="more-filled" size="26"></uni-icons>
				</view>
			</block>
		</uni-nav-bar>
		<transition name="uni-fade">
			<view class="arrivalNavigation" v-if="showHidden" @click="openAdd()">
				<view class="d4"></view>
				<view class="sideNavigation">
					<nav>
						<ul>
							<navigator url="../../pages/add-group/add-group">
								<li>创建社群</li>
							</navigator>
							<navigator url="../retailStore/retailStore">
								<li>创建群聊</li>
							</navigator>
						</ul>
					</nav>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	export default {
		components: {
			uniNavBar
		},
		props: {
			tabBars: Array,
			tabIndex: Number
		},
		data() {
			return {
				showHidden: false
			}
		},
		methods: {
			changeTab(index) {
				this.$emit('change-tab', index);
			},
			openAdd() {
				/* // 打开发布页面
				uni.navigateTo({
					url: '../add-input/add-input',
				}); */
				this.showHidden = !this.showHidden;
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-left>view,
	.nav-right>view {
		font-size: 40upx;
	}

	.nav-left>view {
		color: #FF9619;
	}

	.nav-left {
		margin-left: 16upx;
	}

	.nav-right {
		width: 100%;
	}

	.nav-tab-bar {
		width: 100%;
		margin-left: -20upx;
		position: relative;
		height: 44px;
	}

	.nav-tab-bar>view {
		font-size: 30upx;
		padding: 0 35upx;
		font-weight: bold;
		color: #969696;
	}

	.active {
		color: #333333 !important;
	}

	.nav-tab-bar-line {
		border-bottom: 6upx solid $uni-color-botton;
		width: 70upx;
		border-radius: 20upx;
		position: absolute;
		bottom: 12upx;
	}

	//从这里开始是弹出框的样式
	.arrivalNavigation {
		width: 180rpx;
		position: absolute;
		right: 10rpx;
		top: 54rpx;
		z-index: 999;

		.sideNavigation {
			width: 178rpx;
			background-color: #202020;
			color: #eee;
			border-radius: 10rpx;
			
			ul {
				padding: 12rpx 20rpx;
			}

			li {
				height: 56rpx;
				text-align: center;
				line-height: 56rpx;
				font-size: 26rpx;
				list-style: none;
			}
		}

		.d4 {
			width: 0;
			height: 0;
			margin-left: 135rpx;
			margin-top: -12rpx;
			border-width: 12rpx;
			border-style: solid;
			border-color: transparent #202020 transparent transparent;
			transform: rotate(90deg);
			/*顺时针旋转90°*/
		}
	}
</style>
