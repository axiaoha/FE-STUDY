// Array.prototype.includes(searchElement,fromIndex)
// index vs indexOf

const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7')); //true
console.log(arr.includes('es9')); //false
console.log(arr.includes('es7', 1)); //true
console.log(arr.includes('es7', 2)); //false
console.log(arr.includes('es7', -1)); //false
console.log(arr.includes('es7', -2)); //true

console.log(arr.indexOf('es7')); //1
console.log(arr.indexOf('es7') > -1); //true

// 只能判断基本数据类型，不能判断引用数据类型
const _arr = ['es6', ['es7', 'es8'], 'es9']
console.log(_arr.includes(['es7', 'es8'])); //false
console.log(_arr.indexOf(['es7', 'es8'])); //-1

// indexOf与includes的区别
const __arr = ['es6', 'es7', 'es8', NaN, 2]
console.log(__arr.includes(NaN)); //true
console.log(__arr.indexOf(NaN)); //-1
// 全等于
console.log(__arr.includes('2')); //false
console.log(__arr.indexOf('2')); //-1