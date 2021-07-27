<template>
	<view>
		<button type="default" @click="start">click</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			start() {
				const url = "/api/auth/app/user/login";
				const data = {
						"phoneNumber": 18220154658,
						"captcha": "000000"
				};
				this.$http.post(url, data).then(result => {
					var [error, res]  = result;
					console.log(res.data); 
				})
				// var step = uni.requireNativePlugin('DC-StepCounter');
				// var globalEvent = uni.requireNativePlugin('globalEvent');
				// // 监听globalEvent事件 StepCounter_Ready 在ready后调用计步器相关API
				// globalEvent.addEventListener("StepCounter_Ready", function (e) {
				//         step.getCurrentTimeSportStep(function(n) {
				//             console.log('走了'+n+'步');
				//         })
				//         // 2019-01-13 为时间 使用者根据当前时间修改
				//         step.getTodaySportStepArrayByDate("2021-07-26", function(array){
				//                 console.log(JSON.stringify(array));
				//         })
				// });
				// //调用初始化 先注册StepCounter_Ready事件 再调用initialize初始化 防止StepCounter_Ready事件丢失
				// step.initialize();
			}
		}
	}
</script>

<style>

</style>
