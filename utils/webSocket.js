class webSocket {
	constructor(handlerOptions) {
		this.onmessage = handlerOptions.onmessage
		this.onopen = handlerOptions.onopen
		this.socketUrl = handlerOptions.socketUrl
		this.timeout = 15000
		this.timeoutObj = null
		this.createdSocket()
		this.onOpen()
		this.error()
		this.message()
	}
	// 重置心跳
	reset() {
		clearTimeout(this.timeoutObj)
		this.start()
	}
	// 间隔时间发送心跳
	start() {
		this.timeoutObj = setInterval(()=>{
			// Websocket发送心跳：HeartBeat
			uni.sendSocketMessage({
				data: "HeartBeat",
				success: res => {

				},
				fail: () => {

				},
				complete: () => {

				}
			})
		}, this.timeout)
	}

	// 创建 webSocket 连接
	createdSocket() {
		uni.connectSocket({
			url: this.socketUrl,
			success: res => {

			},
			fail: () => {

			},
			complete: () => {

			}
		})
	}
	//连接成功建立的回调方法
	onOpen() {
		uni.onSocketOpen(res=>{
			console.log('WebSocket连接已打开！');
			this.start()
			this.onopen && this.onopen()
		});
	}

	error() {
		uni.onSocketError(res=>{
			console.log('WebSocket连接打开失败，请检查！');
		});
	}
	//接收到消息的回调方法
	message() {
		uni.onSocketMessage(res => {
			let message = res.data //消息内容
			this.reset() //重置心跳上传时间
			this.onmessage && this.onmessage(message) //消息业务处理
		})
	}

}

export default webSocket