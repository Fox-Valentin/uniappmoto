<template>
	<view class="box">
		<scroll-view scroll-y="true"  @scrolltolower="lower" :lower-threshold="300"
			:style="{height:swiperheight+'px'}">
			<waterfallsFlow :single="true" :list="waterFallList">
			  <template v-slot:default="item">
				<view class="cnt">
				  <view class="image-wrapper">
					<image :src="item.avatar" mode=""></image>
					<view class="title">{{ item.title }}</view>
				  </view>
				  <view class="hand-thumbsup_wrapper">
					 <span>
						<uni-icons type="hand-thumbsup" color="#FF7663" size="18" style="margin-right: 2px;"></uni-icons> 123
					 </span>
				  </view>
				</view>
			  </template>
			</waterfallsFlow>
			<load-more :loadtext="loadtext"></load-more>
		</scroll-view>
	</view>
</template>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	import loadMore from "../../components/common/load-more.vue";
	export default {
		components:{
			waterfallsFlow,
			loadMore,
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					let height=res.windowHeight-uni.upx2px(390)
					this.swiperheight=height;
				}
			});
		},
		data() {
			return {
				swiperheight:500,
				waterFallList: [
						{
						  id: 1,
						  image_url:
							"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg",
						  title: "可爱的小猫咪呀",
						  text:
							"小小的猫咪，甚是呆萌，呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 2,
						  image_url:
							"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg",
						  title: "迪士尼动画",
						  text: "迪士尼动画之……",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 3,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476083909&di=a5debff35edec5de105bc105d6fdbce3&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F77%2F77%2F01300000336597125202779973172.jpg",
						  title: "火箭",
						  text: "火箭升空瞬间，宏伟壮观啊",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 5,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476129760&di=7a3db0b14f6a74240bbfa7922ba22f45&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F82%2F55%2F01300000349330124003555691086.jpg",
						  title: "华佗",
						  text: "华佗人物画像 中国画 线条画 毛笔画 彩色画",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 6,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476215687&di=97c2bbf6f3a1a3e2a6a2dc77dfe4bea7&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F72%2F82%2F19300000009075130804824786610.jpg",
						  title: "恐龙",
						  text: "恐龙来啦",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 7,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476258176&di=29622b0f0cfd659aecebabaae352d02c&imgtype=0&src=http%3A%2F%2F1882.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2011%2F3%2F25%2F13%2F13%2Fu48513077_12fa4ba953ag213.jpg",
						  title: "手",
						  text: "什么？",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 8,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476300222&di=49712f992d8f7bbb1a5851eced71cbe2&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F71%2F56%2F16300000988660128426569668958.jpg",
						  title: "百年好合",
						  text: "百年好合 结婚 庚帖 二次元",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 9,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476416001&di=ea1a1f8f9b1274d39c05af3e48041e6a&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12420002963%2F641",
						  title: "5G",
						  text: "5G 来啦",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 10,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476497015&di=2dfa9a6ec465d7330bc0b4433d63cd9e&imgtype=0&src=http%3A%2F%2Fimgo.zjjjtg.com%2Fimg2020%2F9%2F4%2F10%2F2020090410315179234.jpg",
						  title: "LEVEL 2",
						  text: "LEVEL 2",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
						{
						  id: 12,
						  image_url:
							"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476567983&di=040976a1cd1a6e5510a237c57bdcff06&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12421051168%2F641",
						  title: "王者荣耀",
						  text: "王者荣耀 龙 快来打龙 请求集合",
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
						},
					],
				loadtextmore: '上拉加载更多',
				loadtextloading: '加载中...',
				loadtext: '上拉加载更多',
			}
		},
		methods: {
			lower() {
				console.log(1)
			},
			loadmore() {
				console.log('loadmore')
			}
		},
	}
</script>

<style lang="scss" scoped>
  .cnt {
	display: flex;
	padding: 10px;
	align-items: start;
	justify-content: space-between;
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
	.box {
		overflow: scroll;
		padding-bottom: 10px;
	}
</style>
