<!--
 * @Author: liyang liyang@chfatech.com
 * @Date: 2022-07-01 15:23:50
 * @LastEditors: liyang liyang@chfatech.com
 * @LastEditTime: 2022-07-04 10:29:18
 * @FilePath: /discovery-new-app/pages/webview/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="">
		<web-view style="padding-top: 44px;" :src="webviewURL" ></web-view>
	</view>
</template>

<script>
	import config from "@/config.js"
	export default{
		data(){
			return {
				webviewURL:config.webviewURL
			}
		}
	}
</script>

<style>
</style>