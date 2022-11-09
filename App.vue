<script>
	// 升级检测插件
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	import webSocket from "@/utils/webSocket.js"
	export default {
		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 执行升级检测函数
			checkUpdate();
			// #endif
			// 获取环境信息 安卓app、安卓浏览器、苹果app、苹果浏览器
			let UA = ''
			// #ifndef H5
			const system = uni.getSystemInfoSync()
			const platform = system.platform
			switch (platform) {
				case 'android':
					UA = 'android'
					break;
				case 'ios':
					UA = 'ios'
					break;
			}
			this.$store.commit('setSystemInfo', {
				...system,
				platform: UA
			})
			// #endif

			// #ifdef H5
			let system = window.navigator.userAgent.toLowerCase()
			// 页面宽
			const w = document.documentElement.clientWidth
			// 页面高
			const h = document.documentElement.clientHeight
			// ios
			if (/iPhone|iPod|iPad/i.test(system)) {
				UA = 'ios'
			} else if (/Android|Adr/i.test(system)) {
				UA = 'android'
			}
			this.$store.commit('setSystemInfo', {
				platform: UA,
				screenHeight: h,
				screenWidth: w
			})
			// #endif

			// 获取应用信息
			// #ifndef H5
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.$store.commit('setAppWgtinfo', wgtinfo)
			})
			// #endif
			// 登录状态持久化检测
			const userInfo = uni.getStorageInfoSync('userInfo') || '';
			// 同步到vuex
			if (userInfo != '' && userInfo.token) {
				this.$store.commit('login', userInfo);
			}
		},
		// 当 uni-app 启动，或从后台进入前台显示
		onShow: function() {
			// #ifndef H5
			uni.getSystemInfo({
				success: (res) => {
					const height = res.screenHeight * (750 / res.windowHeight);
				},
				fail: (err) => {

				}
			});
			// #endif
			if(uni.webSocket){
				// console.log(uni.webSocket)
			}else{
				uni.webSocket = new webSocket({
					onmessage: (res) => {
						try{
							const data = JSON.parse(res);
							if (typeof data === "object") {
								// 遍历数组中的id是否含有当前用户的id
								const userId = uni.$store.state.userInfo.id;
								const flag = data.data.userInfo.find((item) => userId == item);
								if (flag) {
									// 触发全局事件
									uni.$emit("onSocketMessageAlarm", data)
								}
							}
						}catch(err){
							const data = res
						}
					},
					onopen: (res) => {},
					socketUrl: "ws://sppt.chfatech.com/sppt_pc/websocket/pushAlarm",
				})
			}
			
		},
		// 当 uni-app 从前台进入后台
		onHide: function() {
			// 触发录像结束事件，关闭录像
			uni.$emit('videotapeStop', true);
			// 关闭webSocket
			uni.closeSocket({
				code: 1000,
				success: () => {

				},
				fail: () => {

				}
			})
		},
		// 当 uni-app 报错时触发
		onError: function() {

		},
		// 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯
		onUniNViewMessage: function() {

		},
		// 页面不存在监听函数
		onPageNotFound: function() {

		},
		// 监听系统主题变化
		onThemeChange: function() {

		}
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

	// 条件编译 除了app和h5平台，各家小程序才会编译
	// 自定义导航栏
	/* #ifdef H5 */
	.u-navbar {

		// 内建元素，防止塌陷
		.u-navbar__placeholder {
			height: calc(20px + 44px) !important;
		}

		.u-navbar--fixed {
			.u-status-bar {
				height: 20px !important;
			}
		}
	}

	/* #endif */
	/* #ifndef APP-PLUS || H5 */
	.mpweixin-navbar-right {
		margin-right: 170rpx;
	}

	/* #endif  */
	.tt {
		font-size: 34rpx !important;
		line-height: 34rpx !important;
	}

	//全局覆盖自定义导航栏样式
	// .navbar > .u-icon__icon {
	// 		line-height: 48rpx !important;
	// 		font-weight: bold !important;
	// 		font-size: 48rpx !important;
	// 	}

	.text {
		font-size: 28rpx;
		font-weight: 500;
		line-height: 0px;
		color: #666666;
	}

	/*每个页面公共css */
	.fdr {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.fdr-sb {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.fdr-c {
		display: flex;
		flex-direction: row !important;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
</style>
