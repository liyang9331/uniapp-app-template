// 小程序兼容处理 混入
let mixin = {
	computed: {
		// 头部占位
		headStyle() {
			return `width: 100%; height: ${this.statusBarHeight + 44}px`;
		},
		tabbarHeight(){
			return this.statusBarHeight + 44 +'px'
		},
		// 获取当前状态栏的高度
		statusBarHeight(){
			const {
				statusBarHeight = 20
			} = uni.getSystemInfoSync();
			return statusBarHeight
		}
	},
}
export default mixin;