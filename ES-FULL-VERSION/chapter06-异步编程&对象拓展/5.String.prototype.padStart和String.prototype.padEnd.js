// String.prototype.padStart()
// String.prototype.padEnd()

// const str = 'axiaoha'
// // 参数1:填充字符串的目标长度 参数2:填充的字符串
// console.log(str.padStart(10, 'x')); //'xxxaxiaoha'
// console.log(str.padEnd(10, 'y')); //'axiaohayyy'
// console.log(str.padStart(10, 'xy')); //'xyxaxiaoha'
// console.log(str.padEnd(10, 'xy')); //'axiaohaxyx'
// console.log(str.padStart(10)); //'   axiaoha'
// console.log(str.padEnd(10, )); //'axiaoha   '

// // 时间格式化：yyyy-mm-dd 2020-04-01
// const now = new Date()
// const year = now.getFullYear()
// const month = (now.getMonth() + 1).toString().padStart(2, '0')
// const day = String.prototype.padStart.call(now.getDate(), 2, '0')
// console.log(`${year}-${month}-${day}`);

// // 电话号码
// const tel = '13234343544'
// const newTel = tel.slice(-4).padStart(tel.length, '*')
// console.log(newTel); //'*******3544'

// console.log(new Date().getTime()); //13位 ms
// timestamp.padEnd(13, '0') //后端返回的可能是s为单位，所以要对时间戳进行补0操作