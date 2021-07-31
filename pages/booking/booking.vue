<template>
	<view>
		<uni-list>
			<uni-list-item title="预约日期" link>
				<template slot="footer">
					<uni-datetime-picker class="picker" 
					v-model="date" 
					:border="false"
					type="date"
					:start="new Date().toDateString()"
					@change="changeDate"
					/>
				</template>
			</uni-list-item>
			<uni-list-item title="预约时间" link @click="changeDate">
				<template slot="footer">
					{{ rangeTime[0] }} 
					<template v-if="rangeTime.length >= 2">
						 -
					</template> {{ rangeTime[1] }}
				</template>
			</uni-list-item>
			<uni-list-item title="人数" link>
				<template slot="footer">
					<!-- <uni-number-box :min="0" :max="9"></uni-number-box> -->
					<picker mode="selector" :range="numRange" @change="numChange" >
						<view>{{num}}</view>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<uni-easyinput :clearable="false" v-model="formData.contactName" class="input-wrapper" trim="all" :inputBorder="false" placeholder="请输入联系人姓名"></uni-easyinput>
				</template>
				<template slot="footer">
					<view>
						<radio-group class="radio-group_wrapper">
							<label class="radio"><radio color="#FF7663" value="r1" checked="true"  />女士</label>
							<label class="radio"><radio color="#FF7663" value="r2"  style="margin-left: 30rpx;"/>先生</label>
						</radio-group>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="get-code_wrapper">
				<template slot="header">
					<uni-easyinput :clearable="false" v-model="formData.phone" type="number" class="input-wrapper" trim="all" :inputBorder="false" placeholder="联系电话"></uni-easyinput>
				</template>
				<template slot="footer">
					<view class="get-code">获取验证码</view>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template slot="header">
					<uni-easyinput :clearable="false" v-model="formData.capcha" type="number" trim="all" class="input-wrapper" :inputBorder="false" placeholder="请输入验证码"></uni-easyinput>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" class="book-btn" hover-class="book-btn-hover" @click="toggle">立即预约</button>
		</view>
		<uni-popup ref="popup" background-color="#fff" class="booking-popup">
			<view class="booking-success">
				<view class="booking-title">
					<view class="booking-title-text">
						预约时间
					</view>
				</view>
				<view class="booking-date">{{ date }}</view>
				<view class="booking-time">
					<text class="booking-time_text">{{ rangeTime[0] }}</text> - 
					<text class="booking-time_text">{{ rangeTime[1] }}</text> 
				</view>
				<view class="booking-list">
					<view class="booking-item">
						<uni-icons color="#FF7663" type="smallcircle-filled"></uni-icons> 记得按照时间早点来哦
					</view>
					<view class="booking-item">
						<uni-icons color="#FF7663" type="smallcircle-filled"></uni-icons>优惠就能提前知道呢
					</view>
				</view>
				<view class="booking-btns">
					<view class="booking-btn_cancel booking-btn" @click="close">取消</view>
					<view class="booking-btn_ok booking-btn" @click="submit">确认</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupTime" type="bottom">
			<view class="select-time-wrapper">
				<s-select-time :isDisabled="true"
				   :currentTime="currentTime"
				   :currentDate="date"
				   :startTime="startTime"
				   :endTime="endTime"
				   :interval="30"
				   @selectedTime="selectedTime"></s-select-time>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import moment from 'moment/min/moment.min.js'
	import tool from "../../common/tool.js"
	export default {
		data() {
			return {
				id: null,
				date: new Date().toDateString(),
				startTime: '',
				endTime: '',
				num: 1,
				numRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				formData: {
					activityId: null,
					phone: '18288888888',
					capcha: '000000',
					contactName: null,
					memberCount: null,
					startReservedTime: null,
					endReservedTime: null,
				},
				detail: null,
				rangeTime: [],
			}
		},
		computed: {
			currentTime() {
				// return moment().format("YYYY-MM-DD HH:mm")
				return moment().format("YYYY-MM-DD")
			}
		},
		onLoad(option) {
			if(option.id) {
				this.id = option.id;
				this.getDetail();
			}
		},
		methods: {
			close() {
				this.$refs.popup.close()
			},
			toggle(type) {
				this.formatValue();
				if(!this.validateValue()) {
					uni.showToast({
						title:"请完善预约信息",
						icon:"none"
					})
					return false;
				}
				if(!tool.validatePhone(this.formData.phone)) {
					uni.showToast({
						title:"请完善预约电话",
						icon:"none"
					})
					return false
				}
				this.$refs.popup.open()
			},
			numChange(e) {
				this.num = this.numRange[e.target.value];
			},
			getDetail() {
				this.$http.get(`/api/app/api/activity/${this.id}`).then(data => {
					this.detail = data;
					if(data.businessHours && data.businessHours.length > 0) {
						const times = data.businessHours.split("-")
						this.startTime = times[0];
						this.endTime = times[1];
					} else {
						this.startTime = "00:00";
						this.endTime = "24:00";
					}
				})
			},
			changeDate(e) {
				this.$refs.popupTime.open()
			},
			selectedTime(e) {
				if(e && e.length >=2) {
					this.rangeTime = e;
					this.$refs.popupTime.close()
				}
			},
			submit() {
				this.$http.post("/api/app/api/appointment", this.formData).then(res=> {
					console.log(res)
				})
			},
			validateValue() {
				console.log(this.formData)
				for (let value in this.formData) {
					if(!this.formData[value]) {
						console.log(value)
						return false;
					}
				}
				return true;
			},
			formatValue() {
				this.formData.activityId = this.id;
				this.formData.memberCount = this.num;
				this.date = moment(this.date).format("YYYY-MM-DD")
				this.formData.startReservedTime = this.date + " " + this.rangeTime[0];
				this.formData.endReservedTime = this.date + " " + this.rangeTime[1];
			},
		}
	}
</script>

<style scoped lang="scss">
	.select-time-wrapper {
		background-color: #FFFFFF;
	}
	.picker {
		/deep/ .uni-date__input {
			height: 26px;
			width: 100%;
			padding: 0 8px;
			line-height: 40px;
			font-size: 14px;
			text-align: right;
			padding: 0;
		}
		/deep/ .uni-date__icon-logo {
			display: none;
		}
		/deep/ .uni-date-x {
			padding: 0;
		}
	}
	.input-wrapper {
		font-size: 15px;
		flex: 2;
			/deep/ .uni-easyinput__content-input {
				padding: 0!important;
			}
	}
	/deep/ .uni-radio-input{
		    appearance: none;
		    margin-right: 5px;
		    outline: 0;
		    border: 1px solid #d1d1d1;
		    background-color: #fff;
		    border-radius: 50%;
		    width: 14px;
		    height: 14px;
		    position: relative;
	}
	.radio-group_wrapper /deep/ .uni-radio-input-checked:before {
		font-size: 14px;
	}
	.get-code {
		background-color: $uni-color-botton;
	    color: #fff;
	    padding: 0 8px;
	    border-radius: 4px;
	    font-size: 12px;
	    line-height: 24px;
	    height: 24px;
	}
	.get-code_wrapper {
		/deep/ .uni-list-item__container {
			align-items: center;
		}
	}
	.book-btn {
		background-color: $uni-color-botton;
		border-radius: 30px;
	}
	.book-btn-hover {
		background-color: #fd5841;
	}
	.booking-popup {
		/deep/ .uni-popup__wrapper{
			border-radius: 20px;
		}
	}
	.booking-success {
		width: 500rpx;
		text-align: center;
		padding: 30rpx 30rpx 60rpx;
		border-radius: 20px;
		.booking-title {
			background-color: $uni-color-botton;
			padding-bottom: 6px;
			margin-bottom: 20px;
			.booking-title-text {
				color: #FFFFFF;
				border-bottom: 2px solid #FFFFFF;
				display: inline-block;
				font-size: 20px;
			}
		}
		.booking-date {
			font-size: 24px;
			font-weight: bold;
			color: $uni-text-color-normal;
		}
		.booking-time {
			color: $uni-text-color-normal;
			font-weight: bold;
			margin-right: 10px;
			padding-bottom: 20px;
			.booking-time_text {
				font-size: 20px;
			}
		}
		.booking-list {
			color: $uni-font-color-grey;
			text-align: left;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.booking-item {
				width: 350rpx;
				text-align-last: justify;
				font-size: 14px;
				font-weight: bold;
			}
		}
		.booking-btns {
			display: flex;
			justify-content: space-evenly;
			padding-top: 20px;
			.booking-btn {
				color: #FFFFFF;
				width: 90px;
				border-radius: 20px;
				padding-top: 2px;
				padding-bottom: 2px;
			}
			.booking-btn_cancel {
				background-color: $uni-color-button-grey;
			}
			.booking-btn_ok {
				background-color: $uni-color-botton;
			}
		}
	}
</style>
