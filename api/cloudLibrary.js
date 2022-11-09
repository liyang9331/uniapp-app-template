import request from "@/utils/request.js"
import config from "@/config"
const baseURL = config.APP_BASE_API_BUSINESS_SERVICE;
const MediaBaseURL = config.APP_BASE_API_MEDIA_SERVICE;
// 云端库
// 根据条件获取云端库年数据
//	detector	设备id 
//  label	标签id 
//  type	类型 1.抓拍 2.录屏
export function getCloudYearByConditions(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudYearByConditions', params);
}

// 根据条件获取云端库月数据
// date  从年份跳转时输入 例：2022
// detector	设备id
// label	标签id
// type	类型 1.抓拍 2.录屏
export function getCloudMonthByConditions(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudMonthByConditions', params);
}

// 根据条件获取云端库日数据
// date  从月份跳转时输入 例：2022-03-11
// detector	设备id
// label	标签id
// type	类型 1.抓拍 2.录屏
export function getCloudByConditions(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudByConditions', params);
}

// 根据条件获取云端库所有数据
// date  例：2022-03-11
// detector	设备id
// label	标签id
// type	类型 1.抓拍 2.录屏
export function getCloudAllByConditions(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudAllByConditions', params);
}

// 根据id获取云端库数据
// date  	例：2022-03-11
// detector	设备id
// label	标签id
// type	类型 1.抓拍 2.录屏
export function getCloudById(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudById', params);
}
// 获取标签
export function getCloudLabel(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudLabel', params);
}
// 获取标签详细信息
export function getCloudLabelDetailed(params) {
	return request.postFormdata(baseURL+'/cmsCloud/getCloudLabelDetailed', params);
}
// 复制标签
// cloudId  云端库id
// labelId  标签id
export function copyLabel(params) {
	return request.postFormdata(baseURL+'/cmsCloud/copyLabel', params);
}
// 移动标签
// cloudId  云端库id
// labelId  标签id
export function mobileLabel(params) {
	return request.postFormdata(baseURL+'/cmsCloud/mobileLabel', params);
}
// 删除视频
// cloudId 云端库id	
export function delCloud(params) {
	return request.postFormdata(baseURL+'/cmsCloud/delCloud', params);
}