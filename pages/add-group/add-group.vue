<template>
	<view>
		<view class="forms-wrapper">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item :labelWidth="100" label="社群名称:"  name="topicName">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.topicName" :trim="true" class="form-item" placeholder="请输入社群名称"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="社群描述:"  name="description">
					<uni-easyinput :clearable="false" :inputBorder="false" v-model="formData.description" :trim="true" class="form-item" placeholder="请输入社群描述"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="社群logo:"  name="logo">
					<uni-file-picker
					    v-model="formData.logo" 
					    fileMediatype="image" 
					    mode="grid" 
						limit="1"
						return-type="object"
						:auto-upload="false"
						ref="files"
					    @select="select($event,'logo')" 
					/>
				</uni-forms-item>
				<uni-forms-item :labelWidth="100" label="社群背景:"  name="bg">
					<uni-file-picker
					    v-model="formData.bg" 
					    fileMediatype="image" 
					    mode="grid" 
						limit="1"
						return-type="object"
						:auto-upload="false"
						ref="files"
					    @select="select($event,'bg')" 
					/>
				</uni-forms-item>
			</uni-forms>
			<view class="uni-common-mt">
				<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="submit">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from "../../common/tool.js"
	export default {
		data() {
			return {
				id: null,
				urls: [],
				imageLogo:[],
				formData: {
					topicName: "",
					description: "",
					logo: null,
					bg: null
				},
				rules: {
					topicName: {
						rules: [{
								required: true,
								errorMessage: '请输入社群名称',
							}]
					},
					description: {
						rules: [{
								required: true,
								errorMessage: '请输入社群描述',
							}]
					},
					logo: {
						rules: [{
								required: true,
								errorMessage: '请选择社群logo',
							}]
					},
					bg: {
						rules: [{
								required: true,
								errorMessage: '请选择社群背景',
							}]
					}
				},
			}
		},
		methods: {
            // 获取上传状态
            select(e,key){
                console.log('选择文件：',e)
				this.$http.upload("/api/file/upload", {
					filePath: e.tempFilePaths[0]
				}).then(result => {
					this.$refs.form.setValue(key, result.url)
				})
            },
			submit() {
				this.$refs.form.validate().then(res=>{
					this.$http.post("/app/api/topic/topics/addTopic", res).then(res => {
						if (!!res) {
							uni.showToast({ title: '保存成功', icon:"none" });
							uni.navigateTo({
								url: '../news/news',
							});
						}
					})
				}).catch(err =>{
				})
			}
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
