<template>
	<view class="page" :style="{height:windowHeight}">
		<u-navbar class="navbar" :autoBack="true" :placeholder="true" :bgColor="'#F6F3F7'">
			<view slot="left" class="fdr-c navbar-left">
				<u--image src="/static/img/navbar/back.png" width="22rpx" height="41rpx" style="margin-right: 21rpx;"></u--image>
				<text class="tt">设置</text>
			</view>
			<view slot="center"></view>
			<view slot="right" class="mpweixin-navbar-right">
			</view>
		</u-navbar>
		<!-- 大头像 -->
		<view class="fdr-c avatar-container">
			<view style="position: relative;">
				<u-avatar size="195" :src="userInfo.avatarUrl!=''?userInfo.avatarUrl:''"></u-avatar>
				<!-- 若果没有设置头像，显示设置头像图标 -->
				<view class="photograph fdr-c" @click="settingAvatar()">
					<image src="/static/img/setting/photograph@2x.png" style="width: 38.6rpx;height: 33.05rpx;">
					</image>
				</view>
			</view>


		</view>
		<view class="from">
			<u-list style="height: 100%;">
				<u-list-item>
					<u-cell :title="userInfo.realName">
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">姓名</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell :title="userInfo.deptName">
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">部门</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell :title="userInfo.id">
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">账号id</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell>
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">手机号</text>
						<view slot="title" class="u-cell__title-text">
							<text>{{userInfo.mobile}}</text>
							<text class="edit" @tap="editPhone()">更换</text>
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell>
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">密码</text>
						<view slot="title" class="u-cell__title-text">
							<text>{{passWord}}</text>
							<text class="edit" @tap="editPassword()">修改</text>
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell @click="cancellation()">
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">服务注销</text>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell @click="about()">
						<text slot="icon" customStyle="margin: -3px 5px -3px 0">关于视频平台</text>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>

		<view class="fdr-c">
			<u-button class="button" type="primary" @tap="logout()">退出</u-button>
		</view>
	</view>
</template>

<script>
	import * as Api from '@/api/user.js'
	import config from "@/config.js"
	export default {
		data() {
			return {
				showSex: false,
				defaultAvatar: '/static/img/user/defaultAvatar.jpg',
				passWord: '',
				userInfo: {},
				config: null
			};
		},
		computed: {
			windowHeight() {
				return this.$store.state.systemInfo.screenHeight + 'px'
			}
		},
		onLoad() {
			this.config = config
			this.getUserInfo();
		},
		methods: {
			// 服务注销
			cancellation() {
				uni.navigateTo({
					url: '../cancellation/cancellation'
				})
			},
			about() {
				uni.navigateTo({
					url: '../about/about'
				})
			},
			getUserInfo() {
				Api.getUserInfo({}).then(res => {
					this.userInfo = res.data.data;
					this.$store.commit('updateUserInfo', res.data.data)
					this.confusionPassword()
				})
			},
			// 更换手机号
			editPhone() {
				uni.navigateTo({
					url: "../edit-user-information/index?mobile=" + this.$store.state.userInfo.mobile,
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						acceptDataFromOpenedPage: (data) => {
							this.getUserInfo()
						},
					},
					success: function(res) {}
				})
			},
			// 修改密码
			editPassword() {
				uni.navigateTo({
					url: "../edit-user-information/index?passWord=" + this.$store.state.userInfo.passWord,
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						acceptDataFromOpenedPage: (data) => {
							// uni.showToast({
							// 	title:"请重新登录",
							// 	icon:'error',
							// 	success: () => {
							// 		this.logout()
							// 	}
							// })
							this.getUserInfo()
						},
					},
					success: function(res) {}
				})
			},
			confusionPassword() {
				let str = '';
				for (let a = 0; a < this.$store.state.userInfo.passWord.length; a++) {
					str += '*';
				}
				// this.passWord = str;
				this.passWord = "******"
			},
			// 退出登录
			logout() {
				Api.logout({}).then(res => {
					this.$store.commit('logout');
					uni.reLaunch({
						url: '../login/login'
					})
				}).catch(res => {

				})
			},
			// 设置头像
			settingAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: 'compressed', //original 原图，compressed 压缩图，默认二者都有
					success: chooseImageRes => {
						if (chooseImageRes.tempFiles[0].type.indexOf("tiff") != -1) {
							uni.showToast({
								title: "不支持tiff格式图片",
								icon: "error"
							})
							return
						}
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// 上传图片
						const params = {
							"filePath": tempFilePaths[0],
							name: "file"
						}
						Api.uploadAvatar(params).then(res => {
							uni.showToast({
								title: '上传成功！',
								icon: 'success'
							});
							this.getUserInfo();
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		height: 100%;
		background: #F6F3F7;
		opacity: 1;
	}

	.avatar-container {
		margin-top: 25rpx;
		margin-bottom: 65rpx;
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
		margin: 0 30rpx;
		background: #FFFFFF !important;
		opacity: 1;
		border-radius: 20rpx;

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

		& /deep/ .u-list-item:nth-child(7) .u-line {
			display: none;
		}
	}

	.button {
		position: fixed;
		bottom: 70rpx;
		width: 630rpx;
		height: 70rpx;
		background: rgba(42, 104, 252, 1);
		opacity: 1;
		border-radius: 14rpx;

	}

	::v-deep .u-button--primary {
		border-color: rgba(42, 104, 252, 1);
	}

	.edit {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 53rpx;
		color: #2A68FC;
		opacity: 1;
		margin-left: 20rpx;
	}
</style>
