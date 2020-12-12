// for循环
// forEach()： 没有返回值， 只是针对每个元素调用func
// map()： 返回新的Array， 每个元素为调用func的结果
// filter()： 返回符合func条件的元素数组
// some()： 返回boolean， 判断是否有元素符合func的条件
// every()： 返回boolean， 判断每个元素是否符合func的条件
// reduce()： 接受一个函数作为累加器
// for in

// // es6数组遍历方式
// find()：返回第一个通过测试的元素
// findIndex()：返回的值为该通过第一个元素的索引
// for of
// values()
// keys()
// entries()

let arr = [1, 2, 3, 2, 4]
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] == 2) {
    //         continue
    //         // break
    //     }
    //     console.log(arr[i]);
    // }

// // 不支持中断循环
// arr.forEach(function(item, index, array) {
//     if (arr[index] == 2) {
//         // continue //Illegal continue statement: no surrounding iteration statement
//         // break //Illegal break statement
//     }
//     console.log(item, index);
// })

// let result = arr.map(function(item, index) {
//     item += 1
//     return item
// })
// console.log(arr, result);

// let result = arr.filter(function(item, index) {
//     return item === 2
// })
// console.log(arr, result);


// let result = arr.some(function(item, index) {
//         return item === 2
//     }) //true
// console.log(arr, result);

// let result = arr.every(function(item, index) {
//         return item === 2
//     }) //false
// console.log(arr, result);

// let sum = arr.reduce(function(prev, cur, index, array) {
//     return prev + cur
// }, 0)
// console.log(sum); //12
// let max = arr.reduce(function(prev, cur, index, array) {
//     return Math.max(prev, cur)
// })
// console.log(max); //4
// let arr1 = arr.reduce(function(prev, cur, index, array) {
//     prev.indexOf(cur) == -1 && prev.push(cur)
//     return prev
// }, [])
// console.log(arr1);

// Array.prototype.foo = function() {
//     console.log("foo");
// }
// for (let index in arr) {
//     console.log(index, arr[index]);
// }

// // find
// let res = arr.find(function(value) {
//     // return value == 4//4
//     return value == 8 //undefined
// })
// console.log(arr, res);

// // findIndex
// let res = arr.findIndex(function(value) {
//     // return value == 2 //1
//     return value == 8 //-1
// })
// console.log(arr, res);

// for off
for (let item of arr) {
    console.log(item);
}
for (let item of arr.values()) {
    console.log(item);
}
for (let item of arr.keys()) {
    console.log(item);
}
for (let [item, index] of arr.entries()) {
    console.log(item, index);
}