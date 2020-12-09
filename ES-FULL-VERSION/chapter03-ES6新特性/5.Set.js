// 一种新的数据结构(和数组有点相似，但数组里面的值是可以重复的，set里面的值是不能重复的)
// 常用方法
// 遍历
// WeakSet

// let s = new Set()
// console.log(s);

// let s = new Set([1, 2, 3, 2])
// console.log(s);
// s.add(4).add(5).delete(1)
// console.log(s);
// console.log(s.has(1)); //false
// console.log(s.size); //4
// // s.clear()
// // console.log(s);
// s.forEach(item => console.log(item)) //2 3 4 5
// for (let item of s) {
//     console.log(item); // 2 3 4 5
// }
// for (let item of s.keys()) {
//     console.log(item); // 2 3 4 5
// }
// for (let item of s.values()) {
//     console.log(item); // 2 3 4 5
// }
// for (let item of s.entries()) {
//     // key和value的值是一样的
//     console.log(item[0] + ',' + item[1]); // 2,2 3,3 4,4 5,5
// }

// 数组去重
// let arr = [1, 2, 3, 4, 2, 3, 4, 5, 6, 7]
// let s = new Set(arr)
// console.log(s);
// console.log([...s]); //[1, 2, 3, 4, 5, 6, 7]

// 合并去重
// let arr1 = [1, 2, 3, 4]
// let arr2 = [2, 3, 4, 5, 6, 7]
// let s = new Set([...arr1, ...arr2])
// console.log(s);
// console.log([...s]); //[1, 2, 3, 4, 5, 6, 7]
// console.log(Array.from(s));

// // 交集
// let arr1 = [1, 2, 3, 4]
// let arr2 = [2, 3, 4, 5, 6, 7]
// let s1 = new Set(arr1)
// let s2 = new Set(arr2)
// let result = new Set(arr1.filter(item => s2.has(item)))
// console.log(Array.from(result)); //[2, 3, 4]
// // 差集
// let arr3 = new Set(arr1.filter(item => !s2.has(item)))
// let arr4 = new Set(arr2.filter(item => !s1.has(item)))
// console.log([...arr3, ...arr4]); //[1, 5, 6, 7]

// WeakSet 只能添加对象，不能添加其他数据类型
let ws = new WeakSet()
const obj1 = {
    name: 'axiaoha'
}
const obj2 = {
    age: 23
}
ws.add(obj1)
ws.add(obj2)
ws.delete(obj1)
console.log(ws);
console.log(ws.has(obj2)); //true
//报错：Uncaught TypeError: ws.forEach is not a function WeakSet的实例对象（弱引用不会被计入垃圾回收机制里面，会被垃圾回收机制GC（引用一次就计数一次）所回收）是不能被遍历的
// 可以用于存储一些临时的变量
// ws.forEach(item => console.log(item))

// EXPAND-03：关于垃圾回收机制

// Set和WeakSet的区别
// 1、 Set可以添加多种数据类型， weakset只能添加对象
// 2、 Set可以被遍历， weakset不能被遍历
// 3、 weakset是弱引用