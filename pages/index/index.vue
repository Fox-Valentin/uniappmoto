<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap">
		</swiper-tab-head>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(tabIndex)">
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
						<Dynamic v-for="(item,index) in list" :key="item.id" :imgList="item.imgList"
							:avatar="item.avatar" :name="item.name" :publishTime="item.publishTime"
							:content="item.content" :isLike="item.isLike" :isGiveReward="item.isGiveReward"
							:likeNumber="item.likeNumber" :giveRewardNumber="item.giveRewardNumber"
							:chatNumber="item.chatNumber" @clickDynamic="clickDynamic(index)"
							@clickUser="clickUser(item.id)" @clickFocus="clickFocus(index)"
							@clickThumbsup="clickThumbsup(item.id)" @clickGiveReward="clickGiveReward(item.id)"
							@clickChat="clickChat(item.id)">
						</Dynamic>
						<load-more v-if="list.length>0" :loadtext="loadtext0"></load-more>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(tabIndex)">
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
						<info-list :listData="infoList"></info-list>
						<load-more v-if="infoList.length > 0" :loadtext="loadtext1"></load-more>
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
				tabBars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "机车公园",
						id: "jichegongongyuan"
					},
				],
				title: 'Hello',
				list: [{
						id: 1,
						avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						name: '小新',
						publishTime: 1617086756,
						content: '中国外交官这样讽加拿大总理，算不算骂？该不该骂？',
						imgList: [
							'../../static/demo/datapic/11.jpg',
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
						],
						isLike: true,
						isGiveReward: true,
						likeNumber: 2,
						giveRewardNumber: 2,
						chatNumber: 2,
						isFocusOn: true,
					},
					{
						id: 2,
						avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2291332875,175289127&fm=26&gp=0.jpg',
						name: '小白',
						publishTime: 1617036656,
						content: '  足不出户享国内核医学领域顶级专家云诊断，“中山-联影”分子影像远程互联融合创新中心揭牌 ',
						imgList: [
							'../../static/demo/datapic/11.jpg',
						],
						isLike: false,
						isGiveReward: false,
						likeNumber: 0,
						giveRewardNumber: 0,
						chatNumber: 2,
						isFocusOn: false,
					},
					{
						id: 3,
						avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						name: '小新',
						publishTime: 1617046556,
						content: '  外交部：一小撮国家和个人编造所谓新疆“强迫劳动”的故事，其心何其毒也！ ',
						imgList: [
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
						],
						isLike: true,
						isGiveReward: false,
						likeNumber: 4,
						giveRewardNumber: 22,
						chatNumber: 52,
					},
					{
						id: 4,
						avatar: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg',
						name: '小龙马',
						publishTime: 1616086456,
						content: 'DCloud有800万开发者,uni统计手机端月活12亿。是开发者数量和案例最丰富的多端开发框架。 欢迎知名开发商提交案例或接入uni统计。 新冠抗疫专区案例 uni-app助力',
						imgList: [
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
						],
						isLike: true,
						isGiveReward: false,
						likeNumber: 25,
						giveRewardNumber: 0,
						chatNumber: 7,
					},
					{
						id: 5,
						avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2590128318,632998727&fm=26&gp=0.jpg',
						name: '风清扬',
						publishTime: 1607086356,
						content: '划个水',
						imgList: [
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
						],
						isLike: true,
						isGiveReward: true,
						likeNumber: 3,
						giveRewardNumber: 2,
						chatNumber: 2,
					}
				],
				infoList: [],
				loadtextmore: '上拉加载更多',
				loadtextloading: '加载中...',
				loadtextover: '没有更多数据了',
				loadtext0: '上拉加载更多',
				loadtext1: '上拉加载更多',
				pageNum1: 0
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.getInfomation()
		},
		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		// 监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 1:
					// 打开发布页面
					uni.navigateTo({
						url: '../add-input/add-input',
					});
					break;
			}
		},
		methods: {
			// 上拉加载
			loadmore(index) {
				console.log('loadMore')
				if (index === 1) {
					this.getInfomation()
				} else if (index === 0) {
					if (this.loadtext0 != this.loadtextmore) {
						return;
					}
					// 修改状态
					this.loadtext0 = this.loadtextloading;
					// 获取数据
					setTimeout(() => {
						//获取完成
						let obj = {
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称",
							isguanzhu: false,
							title: "我是标题",
							type: "img", // img:图文,video:视频
							titlepic: "../../static/demo/datapic/11.jpg",
							infonum: {
								index: 0, //0:没有操作，1:顶,2:踩；
								dingnum: 11,
								cainum: 11,
							},
							commentnum: 10,
							sharenum: 10,
						};
						this.list.push(obj);
						this.loadtext0 = "上拉加载更多";
					}, 1000);
					// this.loadtext0="没有更多数据了";
				}
			},
			getInfomation() {
				if (this.loadtext1 != this.loadtextmore) {
					return;
				}
				this.pageNum1 = this.pageNum1 + 1;
				// 修改状态
				this.loadtext1 = this.loadtextloading;
				this.$http.get('/app/api/information/list', {
					pageNum: this.pageNum1,
					pageSize: 10
				}).then(data => {
					let rows = data.rows || [];
					rows.forEach(item => {
						item.titleImg = item.titleImg.split(';')
					})
					this.infoList = this.infoList.concat(data.rows || []);
					let totalPage = parseInt(data.total / 10) + 1;
					if (totalPage === this.pageNum1) {
						this.loadtext1 = this.loadtextover
					} else {
						this.loadtext1 = this.loadtextmore;
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
			},
			clickDynamic(e) {
				console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e) {
				console.log(e);
				console.log('childUser');
			},
			// 点击关注
			clickFocus(e) {
				this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
				console.log(e);
				console.log('childUser');
			},
			// 点赞
			clickThumbsup(e) {
				console.log(e);
				console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e) {
				console.log(e);
				console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e) {
				console.log(e);
				console.log('clickChat');
			},
		},
	}
</script>

<style lang="scss">
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
