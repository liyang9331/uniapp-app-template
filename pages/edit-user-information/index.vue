<template>
	<view class="page" :style="{height:windowHeight}">
		<u-navbar class="navbar" :autoBack="true" :placeholder="true" :bgColor="'#F6F3F7'">
			<view slot="left" class="fdr-c">
				<u--image src="/static/img/navbar/back.png" width="22rpx" height="41rpx" style="margin-right: 21rpx;"></u--image>
				<text class="tt">{{navbarTitle}}</text>
			</view>
			<view slot="center"></view>
			<view slot="right" class="mpweixin-navbar-right" @tap="cancel()">
				<text class="text">取消</text>
			</view>
		</u-navbar>
		<!-- 手机号提示 -->
		<view class="tips" v-if="isMobile">
			<text class="h1">输入新的手机号</text>
			<text class="h2">当前手机号：{{userMobile}}</text>
		</view>
		<view class="from">
			<u--form :model="userInfo" ref="vfrom" :rules="rules">
				<u-form-item prop="phone" v-if="isMobile">
					<u-cell>
						<view class="u-slot-title" slot="title">
							<text class="u-cell-text">手机号</text>
							<u--input type="passWord" class="input" fontSize="28rpx" placeholder="请输入新的手机号码"
								border="surround" v-model="userInfo.phone">
							</u--input>
						</view>
					</u-cell>
				</u-form-item>
				<u-form-item prop="oldPassword" v-if="!isMobile">
					<u-cell>
						<view class="u-slot-title" slot="title">
							<text class="u-cell-text">旧密码</text>
							<u--input type="passWord" class="input" fontSize="28rpx" placeholder="请输入旧密码"
								border="surround" v-model="userInfo.oldPassword">
							</u--input>
						</view>
					</u-cell>
				</u-form-item>
				<u-form-item prop="passWord" v-if="!isMobile">
					<u-cell>
						<view class="u-slot-title" slot="title">
							<text class="u-cell-text">新密码</text>
							<u--input type="passWord" class="input" fontSize="28rpx" placeholder="请输入新密码"
								border="surround" v-model="userInfo.passWord">
							</u--input>
						</view>
					</u-cell>
				</u-form-item>
				<u-form-item prop="resPassWord" v-if="!isMobile">
					<u-cell>
						<view class="u-slot-title" slot="title">
							<text class="u-cell-text">确认密码</text>
							<u--input type="passWord" class="input" fontSize="28rpx" placeholder="再次填写确认"
								border="surround" v-model="userInfo.resPassWord">
							</u--input>
						</view>
					</u-cell>
				</u-form-item>
			</u--form>
		</view>
		
		<view class="fdr-c">
			<u-button class="btn" @tap="formSubmit()">确认修改</u-button>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user.js'
	export default {
		data() {
			return {
				isMobile: true,
				userInfo: {
					passWord: '',
					phone: '',
					oldPassword: '',
					resPassWord: ''
				},
				rules: {
					phone: [{
						type: 'number',
						required: true,
						message: '请输入手机号码',
					}, {
						message: '请输入正确的电话号码',
						validator: (rule, value) => {
							return uni.$u.test.mobile(value)
						}
					}],
					oldPassword: [{
						type: 'string',
						required: true,
						message: '请输入旧密码'
					}],
					passWord: [{
						type: 'string',
						required: true,
						message: '请输入新密码'
					}],
					resPassWord: [{
						type: 'string',
						required: true,
						message: '请输入确认密码'
					}, {
						message: '请输入正确的确认密码',
						validator: (rule, value) => {
							return value == this.userInfo.passWord ? true : false
						}
					}],
				},
				eventChannel: null,
				navbarTitle: ''
			}
		},
		computed: {
			windowHeight() {
				return this.$store.state.systemInfo.screenHeight + 'px'
			},
			userMobile(){
				return this.$store.state.userInfo.mobile
			}
		},
		onLoad(option) {
			if (option.mobile) {
				this.isMobile = true
				this.navbarTitle = "修改手机号"
			} else if (option.passWord) {
				this.isMobile = false
				this.navbarTitle = "修改密码"
			}
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			this.eventChannel = eventChannel
		},
		methods: {
			cancel() {
				uni.navigateBack({});
			},
			formSubmit() {
				this.$refs.vfrom.validate().then(res => {
					// 验证通过
					const _this = this
					if (this.isMobile) {
						// 修改手机号码
						Api.updPhone({
							newPhone: this.userInfo.phone
						}).then(res => {
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								complete: res => {
									_this.eventChannel.emit('acceptDataFromOpenedPage', {
										data: ''
									});
									setTimeout(() => {
										uni.navigateBack({})
									}, 1500)
								}
							});
						})
					} else {
						// 修改密码
						Api.updPassword({
							oldPassword: this.userInfo.oldPassword,
							newPassword: this.userInfo.passWord
						}).then(res => {
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								complete: res => {
									_this.eventChannel.emit('acceptDataFromOpenedPage', {
										data: ''
									});
									setTimeout(() => {
										uni.navigateBack({})
									}, 1500)
								}
							});
						})
					}

				}).catch((err) => {

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		height: 100%;
		background: #F6F3F7;
		opacity: 1;
	}
	.tips{
		margin-top: 133rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 70rpx;
		.h1{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			line-height: 36px;
		}
		.h2{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin-top: 30rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #666666;
			line-height: 30px;
			
		}
	}
	.from {
		margin: 35rpx 30rpx 0 30rpx;
		opacity: 1;

		& /deep/ .u-form {
			& .u-form-item__body__right__message {
				margin-left: 220rpx !important;
				position: absolute;
				bottom: 0;
				left: 0;
			}

			& .u-form-item__body {
				padding: 0;
			}

			& .u-form-item {
				position: relative;
				background-color: #FFFFFF;

				& .u-cell {
					width: 100%;
				}
			}

			& .u-form-item:nth-child(1) {
				border-radius: 15rpx 15rpx 15rpx 15rpx;

				.u-line {
					display: none;
				}
			}

			& .u-form-item:nth-child(2) {
				margin-top: 30rpx;
				border-radius: 15rpx 15rpx 0rpx 0rpx;
				// .u-line{
				// 	display: none;
				// }
			}

			& .u-form-item:nth-child(3) {
				border-radius: 0rpx 0rpx 15rpx 15rpx;

				.u-line {
					display: none;
				}
			}

			& .u-slot-title {
				display: flex;
				flex-direction: row;
				align-items: center;

				.u-cell-text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					width: 120rpx;
					height: auto;
					line-height: 0;
				}

				.input {
					margin-left: 50rpx;
					border: none;
				}
			}

			& .u-cell__title-text {
				text-align: right;
			}

			& .u-line {
				width: 91% !important;
				margin-left: 30rpx !important;
			}

			& .u-cell__left-icon-wrap {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: #666666;
				opacity: 1;
			}

			& .u-cell__title-text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 53rpx;
				color: #333333;
				opacity: 1;
			}
		}

	}

	.btn {
		position: fixed;
		bottom: 70rpx;
		width: 630rpx;
		height: 90rpx;
		background: linear-gradient(2deg, #1169F6 0%, #468CFF 100%);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 90rpx;
		color: #FFFFFF;
	}
</style>
