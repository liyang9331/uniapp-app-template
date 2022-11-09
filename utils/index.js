/**
 * 
 * @param {Object} obj 对象
 * 去除对象属性值为特点值的属性
 * @return {Blob}
 */
export function objectFilter(obj={},chart=""){
	let newObj = {}
	Object.keys(obj).forEach((item,key)=>{
		if(obj[item]!=chart){
			newObj[item] = obj[item]
		}
	})
	return newObj
}

// 获取刻度
export function timeSlot(step) { //  step = 间隔的分钟
  var date = new Date()
  date.setHours(0) // 时分秒设置从零点开始
  date.setSeconds(0)
  date.setUTCMinutes(0)
  // console.log(date.getHours())
  // console.log(date.getSeconds())
  // console.log(new Date(date.getTime()))

  var arr = []; var timeArr = []
  var slotNum = 24 * 60 / step // 算出多少个间隔
  for (var f = 0; f < slotNum; f++) { //  stepM * f = 24H*60M
    // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
    var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f)) // 获取：零点的时间 + 每次递增的时间
    var hour = ''; var sec = ''
    time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours() // 获取小时
    time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes() // 获取分钟
    timeArr.push(hour + ':' + sec)
  }
  timeArr.push('24:00')
  return timeArr
}