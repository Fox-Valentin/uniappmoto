<template>
	<view>
		<view class="forms-wrapper">
			<uni-forms>
				<uni-forms-item :labelWidth="100" label="品牌:"  name="name">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入品牌"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="型号:"  name="age">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入型号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="车牌号:"  name="name">
					<uni-easyinput :inputBorder="false" class="form-item" placeholder="请输入车牌号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="其他参数:"  name="age">
					<uni-easyinput :inputBorder="false"  class="form-item" placeholder="请输入其他参数"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<view class="">
				添加照片：({{imgAccount}}张)
			</view>
			<view class="">
				<uni-file-picker 
				    v-model="imageValue" 
				    fileMediatype="image" 
				    mode="grid" 
					:auto-upload="false"
					ref="files"
				    @select="select" 
				    @progress="progress" 
				    @success="success" 
				    @fail="fail"
				/>
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<button type="primary" class="book-btn" hover-class="book-btn-hover">保存</button>
			</view>
		<!-- 	<view class="">
				<image :src="urls[0]" @click="clk(0)"></image>
				<image :src="urls[1]" @click="clk(1)"></image>
				<button @click="clk(0)">按钮触发</button>
				<avatar @upload="myUpload" ref="avatar"></avatar>
			</view> -->
		</view>
	</view>
</template>

<script>
    import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
        components: {
            avatar
        },
		computed: {
			imgAccount() {
				let resNum = 0;
				try{
					resNum = parseInt(this.imageValue.length);
				}catch(e){
					resNum = 0;
				}
				console.log(this.imageValue.length)
				return resNum;
			}
		},
		data() {
			return {
				urls: ["../../static/demo/1.jpg","../../static/demo/1.jpg"],
				imageValue:[],
			}
		},
		methods: {
            myUpload(rsp) {
                this.$set(this.urls, rsp.index, rsp.path);
            },
            clk(index) {
                this.$refs.avatar.fChooseImg(index,{
                    selWidth: "300upx", selHeight: "300upx",
                    expWidth: '260upx', expHeight: '260upx'
                });
            },
            // 获取上传状态
            select(e){
                console.log('选择文件：',e)
            },
            // 获取上传进度
            progress(e){
                console.log('上传进度：',e)
            },
            // 上传成功
            success(e){
                console.log('上传成功')
            },
            // 上传失败
            fail(e){
                console.log('上传失败：',e)
            },
			onClick() {
				console.log('跳转')
			}
		}
	}
</script>

<style scoped lang="scss">
	.forms-wrapper {
		border-top: 6px solid $uni-page-bg-color;
		padding-left: 30rpx;
		padding-top: 30rpx;
		/deep/ .label-text {
			font-size: 16px;
			color: $uni-text-color-normal;
		}
		/deep/ .uni-input-placeholder {
			color: $uni-font-color-grey;
		}
	}
	.form-item {
	}
	
	.book-btn {
		background-color: $uni-color-botton;
		border-radius: 30px;
	}
	.book-btn-hover {
		background-color: #fd5841;
	}
	</style>
