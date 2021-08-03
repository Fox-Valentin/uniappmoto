<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap">
		</swiper-tab-head>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="getList('my')">
						<block v-for="item in my.list" :key="item.id">
							<Dynamic :item="item"></Dynamic>
						</block>
						<load-more v-if="my.list.length>0" :loadtext="my.loadtext"></load-more>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="getList('hot')">
						<block v-for="item in hot.list" :key="item.id">
							<Dynamic :item="item"></Dynamic>
						</block>
						<load-more v-if="hot.list.length>0" :loadtext="hot.loadtext"></load-more>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="getList('follow')">
						<view class="like-wrapper">
							<view class="title">
								你有可能感兴趣的人
							</view>
							<view class="like-more">
								查看更多 <uni-icons type="arrowright" color="#ccc"></uni-icons>
							</view>
						</view>
						<view class="">
							<guan-zhu-list></guan-zhu-list>
						</view>
						<block v-for="item in follow.list" :key="item.id">
							<Dynamic :item="item"></Dynamic>
						</block>
						<load-more v-if="follow.list.length>0" :loadtext="follow.loadtext"></load-more>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="getList('info')">
						<view class="like-wrapper">
							<view class="title">
								机车乐园活动预约
							</view>
							<view class="like-more">
								查看更多 <uni-icons type="arrowright" color="#ccc"></uni-icons>
							</view>
						</view>
						<view>
							<huo-dong-list></huo-dong-list>
						</view>
						<info-list :listData="info.list"></info-list>
						<load-more v-if="info.list.length > 0" :loadtext="info.loadtext"></load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>


<script>
	import indexList from "../../components/index/index-list.vue";
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	import guanZhuList from "../../components/index/guan-zhu-list.vue";
	import huoDongList from "../../components/index/huo-dong-list.vue";
	import infoList from "../../components/index/info-list.vue";
	import Dynamic from '../../components/qizai-dynamic/Dynamic.vue';
	export default {
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing,
			guanZhuList,
			huoDongList,
			Dynamic,
			infoList
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				tabBars: [
					{
						name: "推荐",
						id: "my"
					},
					{
						name: "热门",
						id: "hot"
					},
					{
						name: "关注",
						id: "follow"
					},
					{
						name: "机车公园",
						id: "info"
					},
				],
				my: {
					pageNum: 0,
					loadtext:"上拉加载更多",
					list:[]
				},
				hot: {
					pageNum: 0,
					loadtext:"上拉加载更多",
					list:[]
				},
				follow: {
					pageNum: 0,
					loadtext:"上拉加载更多",
					list:[]
				},
				info: {
					pageNum: 0,
					loadtext:"上拉加载更多",
					list:[]
				},
				loadtextmore: '上拉加载更多',
				loadtextloading: '加载中...',
				loadtextover: '没有更多数据了',
				api: {
					'my': '/app/api/feeds/myList',
					'hot': '/app/api/feeds/hotList',
					'follow': '/app/api/feeds/followList',
					'info': '/app/api/information/list',
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.tabBars.forEach(tab => {
				this.getList(tab.id)
			})
		},
		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		methods: {
			getList(key) {
				if (this[key].loadtext != this.loadtextmore) {
					return;
				}
				this[key].pageNum = this[key].pageNum + 1;
				// 修改状态
				this[key].loadtext = this.loadtextloading;
				this.$http.get(this.api[key], {
					pageNum: this[key].pageNum,
					pageSize: 10
				}).then(data => {
					let rows = data.rows || [];
					if (key === 'info') {
						rows.forEach(item => {
							item.titleImg = item.titleImg.split(';')
						})
					}
					this[key].list = this[key].list.concat(rows);
					let totalPage = parseInt(data.total / 10) + 1;
					if (totalPage === this[key].pageNum) {
						this[key].loadtext = this.loadtextover
					} else {
						this[key].loadtext = this.loadtextmore;
					}
				})
			},
			// tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			}
		},
	}
</script>

<style scoped lang="scss">
	.like-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx;
		padding-left: 40rpx;
		padding-right: 40rpx;

		.title {
			color: $uni-text-color-normal
		}

		.like-more {
			color: $uni-font-color-grey;
			font-size: 20rpx;
		}
	}

	.cnt {
		display: flex;
		padding: 10px;
		align-items: start;
		justify-content: start;

		.title {
			font-size: 10px;
			color: $uni-font-color-grey;
		}
	}

	.image-wrapper {
		display: flex;
		align-items: start;
		justify-content: space-evenly;

		image {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
			border-radius: 100%;
			margin-right: 8upx;
		}
	}

	.hand-thumbsup_wrapper {
		display: flex;
		align-items: start;
		line-height: 1;
		color: $uni-font-color-grey;
	}
</style>
