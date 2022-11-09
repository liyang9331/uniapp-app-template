// 本地文件写入、读取操作简化封装
export default {
	//本地存数据，days 有效时间（天）
	set: function(key, value, days) {
		let Days = days || 7 //有效时间默认7天
		let exp = new Date()
		let expires = exp.getTime() + Days * 24 * 60 * 60 * 1000;
		uni.setStorage({
			key: key,
			data: {'value':value,'expires':expires},
			success: function (e) {
			}
		});
	},
	get: function(key) {
		try {
			let o = uni.getStorageSync(key);
			if (o !== null && Date.now() < o.expires) {
				return o.value
			} else {
				this.remove(key);
				return null
			}
		} catch (e) {
			return null
		}
	},
	remove: function(key) {
		uni.removeStorage({
			key: key
		})
	},
	clearAll: function() {
		uni.clearStorage();
	}
}
