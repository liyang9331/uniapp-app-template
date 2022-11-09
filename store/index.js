// vue 2 模式
import dayjs from 'dayjs'
import Vue from 'vue'
import Vuex from 'vuex'
import * as Api_user from '@/api/user.js'
Vue.use(Vuex)
// #ifdef H5
import createPersistedState from "vuex-persistedstate"
// #endif
const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否登录
		userInfo: {},
		wgtinfo: {},
		systemInfo: {},
		// 视频的公共参数 （详细见底部）
		videoCommon: initVideoCommon(),
		// 视频的独立参数
		videoControl: initVideoControl(),
		// 视频选中的参数
		videoSelect: initVideoSelect(),
		// 当前选中的摄像头的id和chid
		selectCamera: {
			id: '',
			chid: ''
		},
		location: {},
		dict: {}
	},
	mutations: {
		uploaddict(state, obj) {
			state.dict[obj.type] = obj.data;
		},
		setlocation(state, data) {
			state.location = data;
		},
		// 登录
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			uni.setStorage({
				key: "userInfo",
				data: userInfo
			})
		},
		// 退出登录
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: "userInfo"
			})
			uni.removeStorage({
				key: "user"
			})
		},
		// 更新用户信息
		updateUserInfo(state, data) {
			state.userInfo = Object.assign(state.userInfo, data)
		},
		// 设置App应用信息
		setAppWgtinfo(state, wgtinfo) {
			state.wgtinfo = wgtinfo
		},
		// 设置客户端设备信息
		setSystemInfo(state, systemInfo) {
			state.systemInfo = systemInfo
		},

		// 更新-视频公共信息
		updateVideoCommon: (state, data) => {
			state.videoCommon = Object.assign(state.videoCommon, data)
		},
		// 重置-视频公共信息
		resetVideoCommon: (state) => {
			state.videoCommon = initVideoCommon()
		},

		// 更新-视频独立信息
		updateVideoControl: (state, data) => {
			state.videoControl[state.videoCommon.activeIndex] =
				Object.assign(state.videoControl[state.videoCommon.activeIndex], data)
		},
		// 重置-视频独立信息
		resetVideoControl: (state) => {
			state.videoControl = initVideoControl()
		},

		// 更新-视频选中信息
		updateVideoSelect: (state, data) => {
			state.videoSelect = data
		},
		// 重置-视频选中信息
		resetVideoSelect: (state) => {
			state.videoSelect = initVideoSelect()
		},
		// 设置选中摄像头数据
		selectCameraData: (state, data) => {
			state.selectCamera = data;
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo: function({
			commit,
			state
		}) {
			Api_user.getUserInfo().then(res => {
				commit('updateUserInfo', res.data.data)
			})
		},
		updateVideoCommon:async function({commit,state},data){
			commit("updateVideoCommon",data)
		}
	},
	// #ifdef H5
	plugins: [createPersistedState()]
	// #endif
})

// 视频公共参数
function initVideoCommon() {
	return {
		splitSreenTotal: 1, //共有几个分屏
		splitSreenIndex: 1, //当前处于第几个分屏
		total: 0, // 总共多少视频
		activeIndex: 0, // 当前被选中的监控设备【通道】所在数组的key
		isFull: false, //是否全屏
		isLock: false, //是否锁屏
		isSplitScreen: false, // 是否分屏
		isRecording: false, // 是否处在录屏中
		recordingStart: 0, // 录制开始时间
		recordingEnd: 0, // 录制结束时间
		videoUrl: '', // 当前播放视频的rtmp地址 - 暂时没用到
	}
}


// 视频独立参数 （分屏下最多四个）
function initVideoControl() {
	var arr = []
	for (var i = 0; i < 4; i++) {
		arr.push({
			speed: '1', // 速度 默认类型为字符串
			isHD: false, // 是否高清
			isVoice: true, // 是否有声音
			isPlay: false, // 是否播放
			stop: false, //是否停止
			seek:0,// 跳帧
			//以下仅回放时使用
			totalDuration: 0, // 视频总时长
			nowDuration: 0, // 当前时长
			startTime: dayjs().format('YYYY-MM-DD') + '00:00:00', // 开始时间（请求回放视频的参数 暂时默认一天的开始和结束）
			endTime: dayjs().format('YYYY-MM-DD') + '23:59:59' // 结束时间
		})
	}

	return arr
}

// 当前选中的视频参数
function initVideoSelect() {
	return {
		// detectorId: '', // 设备id  截图录屏需要用到  
		// detectorName: '', 设备名    
		// 其它字段需要什么就传什么  
	}
}




export default store
