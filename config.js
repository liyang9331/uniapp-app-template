// H5开发环境接口根地址
const m3u8 = "https://sppt.chfatech.com"
const devBaseURL = "/api";

// 生产环境接口根地址
const proBaseURL = "https://sppt.chfatech.com";

// 外部h5 url
const webviewURL = ""
// 高德 web-sdk key
const gdkey = "454f8e18902e584f871769ac65d9f047"
// 高德 web-sdk key 安全秘钥
const gdJscode = "f85375ab619efbf970b584664f59f7cf"
// 高德地图 web 服务key
const gdWebServiceKey = "9a5d7d2834c4f6287bde7c014ffa2fa1"
// 开发测试token
const testToken = ""
// 环境变量
const NODE_ENV = process.env.NODE_ENV;
// H版本号
const version = "V1.3.7"
// 基础网络请求URL
let baseURL = "";
const APP_BASE_API_BUSINESS_SERVICE = "/sppt_pc";
const APP_BASE_API_MEDIA_SERVICE = "/gb28181"
// #ifdef H5
baseURL = NODE_ENV == "development" ? devBaseURL : proBaseURL;
// #endif

// #ifndef H5
baseURL = proBaseURL;
// #endif

const config = {
	baseURL,
	testToken,
	NODE_ENV,
	m3u8,
	webviewURL,
	gdkey,
	gdJscode,
	gdWebServiceKey,
	version,
	APP_BASE_API_BUSINESS_SERVICE,
	APP_BASE_API_MEDIA_SERVICE
}

export default config;
