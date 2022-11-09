<template>
	<view class="page">
		<!-- 占位 -->
		<view class="status_bar" :style="headStyle"></view>
		<u-navbar :autoBack="true">
			<view slot="left"></view>
		</u-navbar>
		<view class="fdr-c" style="margin-bottom: 120rpx">
			<image style="width: 458rpx; height: 458rpx" :src="logo"></image>
			<view class="app-name">
				<text>综合视频管理平台</text>
				<!-- <text>视频监控APP</text> -->
			</view>
			<text class="text-bg">强兼容 · 低延时 · 安全稳定 · 海量并发</text>
		</view>
		<!-- 模拟from表单 -->
		<view class="from">
			<u-form :model="userInfo" ref="loginfrom" :rules="rules">
				<u-form-item prop="phone">
					<u-input type="number" placeholder="请输入电话号码" border="surround" v-model="userInfo.phone">
						<image slot="prefix" src="/static/img/login/phone@2x.png" style="width: 27.5rpx; height: 33rpx">
						</image>
					</u-input>
				</u-form-item>
				<u-form-item prop="password" style="margin-top: 50rpx">
					<u-input type="password" placeholder="请输入密码" border="surround" v-model="userInfo.password">
						<image slot="prefix" src="/static/img/login/password@2x.png"
							style="width: 29.25rpx; height: 32.57rpx">
						</image>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="btn" @click="formSubmit">
				<text class="text" style="font-size: 30rpx; color: #ffffff">立即进入</text>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins/applet-compatibility.js";
	import * as api from "@/api/user.js";
	import storetoken_mixin from "@/mixins/check-login.js";
	export default {
		mixins: [mixin, storetoken_mixin],
		data() {
			return {
				logo:require("@/static/img/ad/logo.png"),
				userInfo: {
					password: "",
					phone: "",
				},
				rules: {
					phone: [{
							type: "string",
							required: true,
							message: "请输入电话号码",
						},
						{
							message: "请输入正确的电话号码",
							validator: (rule, value) => {
								return uni.$u.test.mobile(value);
							},
						},
					],
					password: [{
						type: "string",
						required: true,
						message: "请输入密码",
					}, ],
				},
			};
		},
		onLoad() {},
		methods: {
			formSubmit() {
				this.$refs.loginfrom
					.validate()
					.then((res) => {
						// 验证通过
						api
							.login({
								password: this.userInfo.password,
								userName: this.userInfo.phone,
							})
							.then((res) => {
								// 将用户信息保存到vuex
								this.$store.commit("login", res.data.data);
								// 本地缓存user info
								const flag = this.storageToken(res.data.data);
								if (flag) {
									uni.showToast({
										title: res.data.message,
										icon: "success",
										complete: (res) => {
											setTimeout(() => {
												// 跳转到首页
												uni.redirectTo({
													url: "../index/index",
												});
											}, 1500);
										},
									});
								} else {}
							}).catch(err => {
								uni.showToast({
									title: err.data.message,
									icon: "none"
								});
							})
					})
					.catch((err) => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.app-name {
		width: 352rpx;
		height: 45rpx;
		margin-top: 70rpx;
		font-size: 16px;
		position: relative;
		text-align: center;
		line-height: 45rpx;
		word-spacing: 3px;
		// border: 1px solid red;
		color: #136AF5;

		&::after {
			content: "";
			position: absolute;
			top: 22rpx;
			left: 10rpx;
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			background-color: #136AF5;
		}

		&::before {
			content: "";
			position: absolute;
			top: 22rpx;
			right: 10rpx;
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			background-color: #136AF5;
		}
	}

	.page {
		height: 100%;
	}

	.from {
		display: flex;
		flex-direction: column;
		align-items: center;

		& /deep/ .u-input {
			// padding: 20rpx !important;
			width: 630rpx !important;
			height: 70rpx !important;
			background: rgba(255, 255, 255, 0.39) !important;
			border: 2rpx solid #2a68fc !important;
			opacity: 1;
			border-radius: 20rpx;
		}
	}

	.btn {
		width: 630rpx;
		height: 90rpx;
		margin-top: 162rpx;
		background: linear-gradient(2deg, #1169f6 0%, #468cff 100%);
		opacity: 1;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 90rpx;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text-bg {
		margin-top: 31rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		opacity: 1;
		text-align: center;
	}
</style>
