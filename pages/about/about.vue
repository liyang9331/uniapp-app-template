<template>
	<view class="page">
		<u-navbar :autoBack="true" :placeholder="true" class="navbar">
      <!-- 通过自定义插槽修改顶部导航栏 -->
      <view slot="left" class="fdr-c tabbar-left">
        <u--image
          src="/static/img/navbar/back.png"
          width="22rpx"
          height="41rpx"
          style="margin-right: 21rpx"
        ></u--image>
        <text class="tt">关于视频平台</text>
      </view>
    </u-navbar>
		<view class="fdr-c" style="margin-bottom: 20px;padding-top: 30px;">
			<u-image src="/static/img/about/logo.png" width="100" height="100"></u-image>
		</view>
		<view class="fdr-c" style="margin-bottom: 20px;">
			<view class="fdr-c" style="width: 750rpx;margin-bottom: 5px;">
				<text>{{this.$store.state.wgtinfo.name}}</text></view>
			<text>{{'Version '+this.$store.state.wgtinfo.version}}</text>
		</view>
		<view class="from">
			<u-list style="height: 100%;">
				<u-list-item>
					<u-cell>
						<text slot="icon" customStyle="margin: -3px 5px -3px 0" @click="introduction">功能介绍</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell>
						<text slot="icon" customStyle="margin: -3px 5px -3px 0" @click="complaint">投诉</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell>
						<text slot="icon" customStyle="margin: -3px 5px -3px 0" @click="handleUpdate">检查新版本</text>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>

		<!-- 隐私政策 -->
		<view class="policy">
			<u-link href="https://static-75db1776-10f9-4ced-81d9-c5a80e3232d5.bspapp.com/service-agreement.html"
				text="服务协议" :under-line="true"></u-link>
			<u-link :fontSize="16" href="https://static-75db1776-10f9-4ced-81d9-c5a80e3232d5.bspapp.com/key-policy.html"
				text="隐私政策" :under-line="true"></u-link>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user.js';
	import config from "@/config.js"
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	export default {
		data() {
			return {
				showSex: false,
				defaultAvatar: '/static/img/user/defaultAvatar.jpg',
				passWord: '',
				userInfo: {},
				config:{}
			};
		},
		created() {

		},
		onLoad() {
			this.getUserInfo();
			this.config = config;
		},
		methods: {
			// 投诉
			complaint(){
				uni.showToast({
					title:"此功能暂未开放",
					icon:'error'
				})
			},
			// 功能介绍
			introduction(){
				uni.showToast({
					title:"此功能暂未开放",
					icon:'error'
				})
			},
			// 主动检测版本是否可升级
			handleUpdate(){
				checkUpdate().then(res=>{
					console.log(res)
				}).catch(err=>{
					uni.showToast({
						title:"暂无新版本",
						icon:'error'
					})
				})
			},
			about(){
				uni.navigateTo({
					url:'pages/about/about.vue'
				})
			},
			getUserInfo() {
				Api.getUserInfo({}).then(res => {
					this.userInfo = res.data.data;
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.policy {
		position: fixed;
		bottom: 30px;
		left: 0;
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		/deep/ .u-link {
			font-size: 16px !important;
			/* line-height: 40px; */
			flex: inherit !important;
			margin: 0 10px !important;
		}
	}
	.photograph {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 64rpx;
		height: 64rpx;
		background: rgba(242, 242, 242, 0.39);
		border: 1px solid #FFFFFF;
		box-shadow: 0px 0px 6rpx rgba(0, 0, 0, 0.08);
		border-radius: 50%;
		opacity: 1;
	}

	.from {
		& /deep/ .u-cell__title-text {
			text-align: right;
		}

		& /deep/ .u-line {
			width: 91% !important;
			margin-left: 30rpx !important;
		}

		& /deep/ .u-cell__left-icon-wrap {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 40rpx;
			color: #666666;
			opacity: 1;
		}

		& /deep/ .u-cell__title-text {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 53rpx;
			color: #333333;
			opacity: 1;
		}

		margin: 0 30rpx;
		background: rgba(255, 255, 255, 0.39);
		opacity: 1;
		border-radius: 20rpx;
	}

	.button {
		margin-top: 264rpx;
		width: 630rpx;
		height: 70rpx;
		background: rgba(42, 104, 252, 1);
		opacity: 1;
		border-radius: 14rpx;
	}

</style>
