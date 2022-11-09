<template>
	<view class="tki-tree">
		<view class="tki-tree-cnt" :class="{'show':showTree}">
			<view class="tki-tree-view">
				<scroll-view class="tki-tree-view-sc" :scroll-y="true">
					<block v-for="(item, index) in treeList" :key="index">
						<view class="tki-tree-item" :style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]" :class="{
							border: border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild,
							open: item.open,
						}">
							<!-- 父级 -->
							<view class="view-dom" v-if="item.source.children">
								<view class="tki-tree-label" @tap.stop="_treeItemTap(item, index)">
									<!-- 父级必有展开icon -->
									<image class="tki-tree-icon" :style="[{'margin-left':(item.rank+1)*30+'rpx'}]"
										:src="item.open?currentIcon:defaultIcon"></image>
									<image :src="parentIcon[item.rank].default" :style="[{'width':parentIcon[item.rank].width,
									'height':parentIcon[item.rank].height}]">
									</image>
									<text class="group">{{item.source.groupName}}</text>
								</view>
							</view>
							<!-- 最后一级 -->
							<view class="view-dom" v-if="item.source.children?false:true">
								<view class="tki-tree-label" @tap.stop="_treeItemSelect(item, index)">
									<!-- 		<image class="tki-tree-icon-child"
									v-if="item.source.avatarUrl"
									:style="{width:childIcon[0].width,height:childIcon[0].height}" 
									:src="item.source.avatarUrl"></image> -->
									<u--image class="tki-tree-icon-child" v-if="item.source.avatarUrl"
										:showLoading="true" :src="item.source.avatarUrl" :width="childIcon[0].width"
										:height="childIcon[0].height" shape="circle"></u--image>

									<image class="tki-tree-icon-child" v-else
										:style="{width:childIcon[0].width,height:childIcon[0].height}"
										:src="item.source.state?childIcon[0].default:childIcon[0].current"></image>
									<text class="group">{{item.source.groupName}}</text>
								</view>
								<view class="tki-tree-check" v-if="item.checked?true:false">
									<image src="/static/img/device-tree/select@2x.png" style="width: 35.2rpx;
								height: 24.8rpx;"></image>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tki-tree",
		props: {
			range: {
				type: Array,
				default: function() {
					return []
				}
			},
			idKey: {
				type: String,
				default: 'id'
			},
			rangeKey: {
				type: String,
				default: 'label'
			},
			title: {
				type: String,
				default: ''
			},
			multiple: { // 是否可以多选
				type: Boolean,
				default: false
				// default: true
			},
			selectParent: { //是否可以选父级
				type: Boolean,
				default: false
			},
			foldAll: { //折叠时关闭所有已经打开的子集，再次打开时需要一级一级打开
				type: Boolean,
				default: false
			},
			lastIcon: { // 没有子集的ic
				type: String,
				default: ''
			},
			border: { // 是否有分割线
				type: Boolean,
				default: false
			},
			// 展开，收回icon
			currentIcon: {
				type: String,
				default: ''
			},
			defaultIcon: {
				type: String,
				default: ''
			},
			// 父级icon
			parentIcon: {
				type: Array,
				default: []
			},
			// 子级icon
			childIcon: {
				type: Array,
				default: []
			},
			isBar: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showTree: true,
				treeList: [],
				selectIndex: -1,
			}
		},
		created() {},
		mounted() {
			this._initTree();
			setTimeout(() => {
				console.log(this.treeList, 'treeList')
			}, 0)
		},
		computed: {},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			_show() {
				this.showTree = true
			},
			_hide() {
				this.showTree = false
			},
			_cancel() {
				this._hide()
				this.$emit("cancel", '');
			},
			_confirm() {
				// 处理所选数据
				let rt = [],
					obj = {};
				this.treeList.forEach((v, i) => {
					if (this.treeList[i].checked) {
						obj = {}
						obj.parents = this.treeList[i].parents
						obj = Object.assign(obj, this.treeList[i].source)
						// 移除子元素
						delete obj.children
						rt.push(obj)
					}
				})
				// this._hide()
				this.$emit("confirm", rt);
			},
			//扁平化树结构
			_renderTreeList(list = [], rank = 0, parentId = [], parents = []) {
				list.forEach(item => {
					this.treeList.push({
						id: item[this.idKey],
						name: item[this.rangeKey],
						source: item,
						parentId, // 父级id数组
						parents, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						open: false, //是否打开
						show: rank === 0, // 自身是否显示
						hideArr: [],
						orChecked: item.checked ? item.checked : false,
						checked: item.checked ? item.checked : false,
					})
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parentid = [...parentId],
							parentArr = [...parents],
							childrenid = [...childrenid];
						delete parentArr.children
						parentid.push(item[this.idKey]);
						parentArr.push({
							[this.idKey]: item[this.idKey],
							[this.rangeKey]: item[this.rangeKey]
						})
						this._renderTreeList(item.children, rank + 1, parentid, parentArr);
					} else {
						this.treeList[this.treeList.length - 1].lastRank = true;
					}
				})
			},
			// 处理默认选择
			_defaultSelect() {
				this.treeList.forEach((v, i) => {
					if (v.checked) {
						this.treeList.forEach((v2, i2) => {
							if (v.parentId.toString().indexOf(v2.parentId.toString()) >= 0) {
								v2.show = true
								if (v.parentId.includes(v2.id)) {
									v2.showChild = true;
									v2.open = true;
								}
							}
						})
					}
				})
			},
			// 点击
			_treeItemTap(item, index) {
				if (item.lastRank === true) {
					//点击最后一级时触发事件
					this.treeList[index].checked = !this.treeList[index].checked
					this._fixMultiple(index)
					return;
				}
				let list = this.treeList;
				let id = item.id;
				item.showChild = !item.showChild;
				item.open = item.showChild ? true : !item.open;
				list.forEach((childItem, i) => {
					if (item.showChild === false) {
						//隐藏所有子级
						if (!childItem.parentId.includes(id)) {
							return;
						}
						if (!this.foldAll) {
							if (childItem.lastRank !== true && !childItem.open) {
								childItem.showChild = false;
							}
							// 为隐藏的内容添加一个标记
							if (childItem.show) {
								childItem.hideArr[item.rank] = id
							}
						} else {
							if (childItem.lastRank !== true) {
								childItem.showChild = false;
							}
						}
						childItem.show = false;
					} else {
						// 打开子集
						if (childItem.parentId[childItem.parentId.length - 1] === id) {
							childItem.show = true;
						}
						// 打开被隐藏的子集
						if (childItem.parentId.includes(id) && !this.foldAll) {
							if (childItem.hideArr[item.rank] === id) {
								childItem.show = true;
								if (childItem.open && childItem.showChild) {
									childItem.showChild = true
								} else {
									childItem.showChild = false
								}
								childItem.hideArr[item.rank] = null
							}
						}
					}
				})
			},
			// 选择
			_treeItemSelect(item, index) {
				// this.treeList[index].checked = !this.treeList[index].checked
				this._fixMultiple(index);
			},
			// 处理单选多选
			_fixMultiple(index) {
				if (!this.multiple) {
					// 如果是单选
					this.treeList.forEach((v, i) => {
						if (i != index) {
							this.treeList[i].checked = false
						} else {
							this.treeList[i].checked = true
						}
					})
				}
			},
			// 重置数据
			_reTreeList() {
				this.treeList.forEach((v, i) => {
					this.treeList[i].checked = v.orChecked
				})
			},
			_initTree(range = this.range) {
				this.treeList = [];
				this._renderTreeList(range);
				this.$nextTick(() => {
					this._defaultSelect(range)
				})
			}
		},
		watch: {
			multiple() {
				if (this.range.length) {
					this._reTreeList();
				}
			},
			selectParent() {
				if (this.range.length) {
					this._reTreeList();
				}
			},
		},
	}
</script>

<style scoped>
	@import "./style.css";
</style>
