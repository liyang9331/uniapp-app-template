// vue.config.js
let filePath = ''; // 默认文件路径
let timeStamp = ''; // 时间戳
//编译环境判断，可以根据不同环境来做相应的配置
if (process.env.UNI_PLATFORM === 'h5') {
	filePath = 'static/js/'
	timeStamp = new Date().getTime();
}
module.exports = {
	configureWebpack: {
		/**
		 * filePath: 路径 
		 * timeStamp: 时间戳
		 */ 
		output: {
			filename: `${filePath}[name]${timeStamp}.js`, 
			chunkFilename: `${filePath}[name]${timeStamp}.js`
		},
	},
	devServer: {
		port: 8090,
		open: false,
		// changeOrigin: true, // 是否跨域
		https: false, //是否开启https
		hotOnly: false,
		proxy: {
			'/api': {
				// target: 'https://sppt.chfatech.com',
				target: 'http://192.168.0.123:8000',
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				secure: true, // 设置支持https协议的代理
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	}
}
