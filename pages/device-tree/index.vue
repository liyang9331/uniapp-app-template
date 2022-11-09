<template>
	<view class="tree">
		<!-- 占位 -->
		<view class="status_bar" :style="headStyle"></view>
		<u-navbar :autoBack="true" class="unavbar">
			<view slot="left" class="fdr-c tabbar-left">
				<u-icon name="arrow-left"></u-icon>
				<text class="tt"></text>
			</view>
			<view slot="center"></view>
			<view slot="right" class="mpweixin-navbar-right">
				<view class="tki-tree-bar-confirm" hover-class="hover-c"
					@click="confirmTree">确定</view>
			</view>
		</u-navbar>
		<view class="fdr-c">
			<tki-tree ref="tree" :range="range" :rangeKey="rangeKey" :idKey="rangeKey"
				@confirm="confirm" currentIcon="/static/img/device-tree/open@2x.png"
				defaultIcon="/static/img/device-tree/tack-back@2x.png" 
				:parentIcon="parentIcon"
				:childIcon="childIcon">
			</tki-tree>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins/applet-compatibility.js"
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import Random from "@/utils/random.js"
	import {
		getDetectorTree
	} from '@/api/equipment.js'
	export default {
		mixins:[mixin],
		components: {
			tkiTree
		},
		data() {
			return {
				range: [],
				parentIcon: [{
					default: '/static/img/device-tree/folder.png',
					current: "/static/img/device-tree/folder.png",
					width: "55rpx",
					height: "55rpx"
				}],
				childIcon: [{
					default: '/static/img/device-tree/camera-ok@2x.png',
					current: "/static/img/device-tree/camera-no@2x.png",
					width: "31.69rpx",
					height: "45.41rpx"
				}],
				rangeKey: 'key'
			}
		},
		onLoad() {
			getDetectorTree({}).then(res => {
				this.range = res.data.data.map((item, index) => {
					// item 分组 第一级
					if(item.children && item.children.length>0){
						let array = item.children
						array = array.map((itm,inx)=>{
							itm.child = itm.children
							delete itm.children
							return {...itm,name:itm.detectorName,key:Random.randomString()}
						})
						item.children = array
					}
					return {...item,key: Random.randomString(),name:item.groupName}
				});
			});
		},
		methods: {
			confirm(res) {
				// 树形组件勾选的数据回调
				// 需要将回调的数据进行 全局事件触发 并传递过去
			},
			confirmTree(res){
				this.$refs.tree._confirm();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tree {
		width: 100%;
		height: 100%;
		background: rgba(245, 246, 248, 0.39);
		opacity: 1;
	}
</style>
