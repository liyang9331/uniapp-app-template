<template>
	<!-- 三部分 -->
	<view class="page">
		<!-- 占位 -->
		<view class="status_bar" :style="headStyle"></view>
		<u-navbar :autoBack="true">
			<view slot="left"></view>
		</u-navbar>
		<!-- 倒计时 -->
		<view class="count-down">
			<text>{{countDown}}s</text>
		</view>
		<!-- 中间内容区域 -->
		<view class="page-content fdr-c">
			<image class="img-1" :src="logo"></image>
			<view class="app-name">
				<text>综合视频管理平台</text>
			</view>
			<text class="text">强兼容 · 低延时 · 安全稳定 · 海量并发</text>
			<!-- 底部确认按钮 -->
			<button class="btn" @click="switchTab()" type="default">立即进入</button>
		</view>
	</view>

</template>

<script>
	import compatibility_mixin from "@/mixins/applet-compatibility.js"
	import storetoken_mixin from "@/mixins/check-login.js"
	export default {
		mixins: [compatibility_mixin, storetoken_mixin],
		data() {
			return {
				countDown: 3,
				logo:require("@/static/img/ad/logo.png")
			}
		},
		onLoad() {
			this.countDownFnc();
		},
		methods: {
			countDownFnc() {
				let setval = setInterval(() => {
					if (this.countDown == 0) {
						clearInterval(setval);
						this.switchTab();
					} else {
						this.countDown = this.countDown - 1;
					}

				}, 1000)
			},
			switchTab() {
				// 登陆检测
				this.checkLogin();
			}
		}
	}
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
		// word-spacing: 3px;
		color: #136AF5;
	}

	.app-name::after {
		content: "";
		position: absolute;
		top: 22rpx;
		left: 10rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #136AF5;
	}

	.app-name::before {
		content: "";
		position: absolute;
		top: 22rpx;
		right: 10rpx;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #136AF5;
	}

	.page {
		flex: 1;
		width: 750rpx;
		background: rgba(255, 255, 255, 0.39);
		opacity: 1;
	}

	.count-down {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-right: 15rpx;
	}

	.img-1 {
		width: 564rpx;
		height: 564rpx;
	}

	.img-2 {
		width: 352rpx;
		height: 45rpx;
		margin-top: 166rpx;
	}

	.text {
		margin-top: 31rpx;
		font-size: 30rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		opacity: 1;
		text-align: center;
	}

	.btn {
		width: 630rpx;
		height: 90rpx;
		margin-top: 162rpx;
		background: linear-gradient(2deg, #1169F6 0%, #468CFF 100%) !important;
		opacity: 1;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-weight: 400;
		line-height: 90rpx;
		color: #FFFFFF;
	}
</style>
