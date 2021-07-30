<template>
	<view>
		<view class="forms-wrapper">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item :labelWidth="100" label="品牌:"  name="brand">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.brand" :trim="true" class="form-item" placeholder="请输入品牌"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="型号:"  name="type">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.type" :trim="true" class="form-item" placeholder="请输入型号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="车牌号:"  name="motoNum">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.motoNum" :trim="true" class="form-item" placeholder="请输入车牌号"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="发动机号:"  name="engineNum">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.engineNum"   :trim="true" class="form-item" placeholder="请输入其他参数"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="车架号:"  name="frameNum">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.frameNum" :trim="true" class="form-item" placeholder="请输入其他参数"></uni-easyinput>
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
					@delete="deleleImg"
				/>
			</view>
			<view class="uni-common-mt">
				<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="submit">保存</button>
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
    // import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import tool from "../../common/tool.js"
	export default {
        components: {
            // avatar
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
				id: null,
				urls: [],
				imageValue:[],
				formData: {
					brand: "",
					type: "",
					motoNum: "",
					pic: "",
					engineNum: "",
					frameNum: "",
				},
				rules: {
					Brand: {
						rules: [{
								required: true,
								errorMessage: '请输入品牌',
							}]
					},
					Type: {
						rules: [{
								required: true,
								errorMessage: '请输入型号',
							}]
					},
					motoNum: {
						rules: [{
								required: true,
								errorMessage: '请输入车牌号',
							}]
					},
				},
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
				this.$http.upload("/api/app/api/user/moto/picture", {
					filePath: e.tempFilePaths[0]
				}).then(result => {
					this.imageValue.push(tool.formatFile(result))
				})
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
			},
			deleleImg(e) {
				// {
				//      "name":"file.txt",
				//      "extname":"txt",
				//      "url":"https://xxxx",
				//      // ...
				//  }
				try{
					this.imageValue.forEach((img, index) => {
						if(img.name === e.tempFile.name) {
							this.imageValue.splice(index, 1);
						}
					})
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			submit() {
				this.$refs.form.validate().then(res=>{
					let pic = [];
					this.imageValue.forEach((img, index) => {
						pic.push(img.url);
					})
					const data = {
						...res,
						pic: pic.join(","),
					}
					if(this.ifEdit()) {
						this.$http.put("/api/app/api/user/moto", {...data, id: this.id}).then(res => {
							uni.showToast({ title: '修改成功', icon:"none" })
						})
					} else {
						this.$http.post("/api/app/api/user/moto", data).then(res => {
							uni.showToast({ title: '保存成功', icon:"none" })
						})
					}
				}).catch(err =>{
				})
			},
			getDetail() {
				this.$http.get(`/api/app/api/user/moto/${this.id}`).then(data => {
					this.formData = {
						brand: data.brand,
						motoNum: data.motoNum,
						type: data.type,
						engineNum: data.engineNum,
						frameNum: data.frameNum,
					};
					if(data.pic && data.pic.length > 0) {
						const pics = data.pic.split(",");
						pics.forEach(pic => {
							this.imageValue.push(tool.formatFile(pic));
						})
					}
				})
			},
			ifEdit() {
				return this.id !== null ? true : false;
			},
		}
	}
</script>

<style scoped lang="scss">
	.forms-wrapper {
		border-top: 6px solid $uni-page-bg-color;
		padding-left: 30rpx;
		padding-right: 30rpx;
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
