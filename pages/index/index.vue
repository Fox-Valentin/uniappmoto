<template>
	<view>
	<swiper-tab-head 
	:tabBars="tabBars" 
	:tabIndex="tabIndex"
	@tabtap="tabtap">
	</swiper-tab-head>
	<view class="uni-tab-bar">
		<swiper class="swiper-box" 
		:style="{height:swiperheight+'px'}" 
		:current="tabIndex"
		@change="tabChange">
		<swiper-item  v-for="(items,index) in newslist" :key="index">
			<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
				<template v-if="index === 0">
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
				</template>
				<template v-else>
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
				</template>
				<template v-if="index === 0">
					<template v-if="items.list.length>0">
					<!-- 	<block v-for="(item,index1) in items.list" :key="index1">
							<index-list :item="item" :index="index1"></index-list>
						</block> -->
						<Dynamic v-for="(item,index) in list" :key="item.id" 
								:imgList="item.imgList" 
								:avatar="item.avatar"
								:name="item.name"
								:publishTime="item.publishTime"
								:content="item.content"
								:isLike="item.isLike"
								:isGiveReward="item.isGiveReward"
								:likeNumber="item.likeNumber"
								:giveRewardNumber="item.giveRewardNumber"
								:chatNumber="item.chatNumber"
								@clickDynamic="clickDynamic(index)"
								@clickUser="clickUser(item.id)"
								@clickFocus="clickFocus(index)"
								@clickThumbsup="clickThumbsup(item.id)"
								@clickGiveReward="clickGiveReward(item.id)"
								@clickChat="clickChat(item.id)">
							</Dynamic>
						<load-more :loadtext="loadtext"></load-more>
					</template>
					<template v-else>
						<no-thing></no-thing>
					</template>
				</template>
				<template v-if="index === 1">
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
				</template>
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
	import Dynamic from '../../components/qizai-dynamic/Dynamic.vue';
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	export default {
		components:{
			indexList,
			swiperTabHead,
			loadMore,
			noThing,
			guanZhuList,
			huoDongList,
			Dynamic,
			waterfallsFlow,
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars:[
					{ name:"关注",id:"guanzhu" },
					{ name:"机车公园",id:"jichegongongyuan" },
				],	
				newslist:[
					{
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								type:"img", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								infonum:{
									index:0,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:true,
								title:"我是标题",
								type:"video", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								playnum:"20w",
								long:"2:47",
								infonum:{
									index:1,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								type:"img", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								infonum:{
									index:0,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:true,
								title:"我是标题",
								type:"video", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								playnum:"20w",
								long:"2:47",
								infonum:{
									index:1,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								type:"img", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								infonum:{
									index:0,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:true,
								title:"我是标题",
								type:"video", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								playnum:"20w",
								long:"2:47",
								infonum:{
									index:1,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								type:"img", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								infonum:{
									index:0,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:true,
								title:"我是标题",
								type:"video", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								playnum:"20w",
								long:"2:47",
								infonum:{
									index:1,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:false,
								title:"我是标题",
								type:"img", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								infonum:{
									index:0,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							},
							{
								userpic:"../../static/demo/userpic/12.jpg",
								username:"昵称",
								isguanzhu:true,
								title:"我是标题",
								type:"video", // img:图文,video:视频
								titlepic:"../../static/demo/datapic/11.jpg",
								playnum:"20w",
								long:"2:47",
								infonum:{
									index:1,//0:没有操作，1:顶,2:踩；
									dingnum:11,
									cainum:11,
								},
								commentnum:10,
								sharenum:10,
							}
						]
					},
					{
						loadtext:"上拉加载更多",
						list:[]
					},
					{
						loadtext:"上拉加载更多",
						list:[]
					},
					{
						loadtext:"上拉加载更多",
						list:[]
					}
				],
				title: 'Hello',
				list:[
						{
							id:1,
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
							name:'小新',
							publishTime:1617086756,
							content:'中国外交官这样讽加拿大总理，算不算骂？该不该骂？',
							imgList:[
								'../../static/demo/datapic/11.jpg',
								'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							],
							isLike:true,
							isGiveReward:true,
							likeNumber:2,
							giveRewardNumber:2,
							chatNumber:2,
							isFocusOn:true,
						},
						{
							id:2,
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2291332875,175289127&fm=26&gp=0.jpg',
							name:'小白',
							publishTime:1617036656,
							content:'  足不出户享国内核医学领域顶级专家云诊断，“中山-联影”分子影像远程互联融合创新中心揭牌 ',
							imgList:[
								'../../static/demo/datapic/11.jpg',
							],
							isLike:false,
							isGiveReward:false,
							likeNumber:0,
							giveRewardNumber:0,
							chatNumber:2,
							isFocusOn:false,
						},
						{
							id:3,
							avatar:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=26&gp=0.jpg',
							name:'小新',
							publishTime:1617046556,
							content:'  外交部：一小撮国家和个人编造所谓新疆“强迫劳动”的故事，其心何其毒也！ ',
							imgList:[
								'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
								'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
								'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
								'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
								'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
							],
							isLike:true,
							isGiveReward:false,
							likeNumber:4,
							giveRewardNumber:22,
							chatNumber:52,
						},
						{
							id:4,
							avatar:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg',
							name:'小龙马',
							publishTime:1616086456,
							content:'DCloud有800万开发者,uni统计手机端月活12亿。是开发者数量和案例最丰富的多端开发框架。 欢迎知名开发商提交案例或接入uni统计。 新冠抗疫专区案例 uni-app助力',
							imgList:[
								'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
								'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
								'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
							],
							isLike:true,
							isGiveReward:false,
							likeNumber:25,
							giveRewardNumber:0,
							chatNumber:7,
						},
						{
				                    id:5,
				                    avatar:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2590128318,632998727&fm=26&gp=0.jpg',
				                    name:'风清扬',
				                    publishTime:1607086356,
				                    content:'划个水',
				                    imgList:[
				                        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
				                        'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
				                        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2369680151,826506100&fm=26&gp=0.jpg',
				                        'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1976832114,2993359804&fm=26&gp=0.jpg',
				                    ],
				                    isLike:true,
				                    isGiveReward:true,
				                    likeNumber:3,
				                    giveRewardNumber:2,
				                    chatNumber:2,
				                }
				    ],
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
		onLoad() {
			uni.getSystemInfo({
				success: (res)=> {
					let height=res.windowHeight-uni.upx2px(100)
					this.swiperheight=height;
				}
			});
		},
		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		// 监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e){
			switch (e.index){
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
			loadmore(index){
				if(index === 1) {
					if(this.loadtext!=this.loadtextmore){ return; }
					// 修改状态
					this.loadtext = this.loadtextloading;
					// 获取数据
					setTimeout(()=> {
						const ary = [
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
						]
						ary.forEach(item => {
							this.waterFallList.push(item)
						})
					})
				} else if(index === 0) {
					if(this.loadtext!=this.loadtextmore){ return; }
					// 修改状态
					this.loadtext = this.loadtextloading;
					// 获取数据
					setTimeout(()=> {
						//获取完成
						let obj={
							userpic:"../../static/demo/userpic/12.jpg",
							username:"昵称",
							isguanzhu:false,
							title:"我是标题",
							type:"img", // img:图文,video:视频
							titlepic:"../../static/demo/datapic/11.jpg",
							infonum:{
								index:0,//0:没有操作，1:顶,2:踩；
								dingnum:11,
								cainum:11,
							},
							commentnum:10,
							sharenum:10,
						};
						this.newslist[index].list.push(obj);
						this.newslist[index].loadtext="上拉加载更多";
					}, 1000);
					// this.newslist[index].loadtext="没有更多数据了";
				}
			},
			// tabbar点击事件
			tabtap(index){
				this.tabIndex=index;
			},
			// 滑动事件
			tabChange(e){
				this.tabIndex=e.detail.current;
			},
			clickDynamic(e){
				console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e){
				console.log(e);
				console.log('childUser');
			},
			// 点击关注
			clickFocus(e){
				this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
				console.log(e);
				console.log('childUser');
			},
			// 点赞
			clickThumbsup(e){
				console.log(e);
				console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e){
				console.log(e);
				console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e){
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
			color:$uni-text-color-normal
		}
		.like-more{
			color: $uni-font-color-grey;
			font-size: 20rpx;
		}
	}
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
</style>
