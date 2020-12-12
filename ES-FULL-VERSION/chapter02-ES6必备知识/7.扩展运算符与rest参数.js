// ...
// 扩展运算符：把数组或者类数组展开成用逗号隔开的值
// rest参数：把逗号隔开的值组合成一个数组

// 扩展运算符
// function foo(a, b, c) {
//     console.log(a, b, c);
// }
// let arr = [1, 2, 3]
// foo(...arr)
// console.log(...arr);

// let arr1 = [1, 2, 3]
// let arr2 = [4, 5, 6]
//     // Array.prototype.push.apply(arr1, arr2)
// arr1.push(...arr2)
// console.log(arr1);

// let str = 'axiaoha'
// let arr = [...str]
// console.log(arr);

// rest参数
// function foo(x, y, z) {
//     let sum = 0
//         // Array.prototype.forEach.call(arguments, function(item) {
//         //     sum += item
//         // })
//         // Array.from(arguments).forEach(function(item) {
//         //     sum += item
//         // })
//     return sum
// }
// console.log(foo(1, 2))
// console.log(foo(1, 2, 3))

// function foo(...args) {
//     let sum = 0
//     args.forEach(function(item) {
//         sum += item
//     })
//     return sum
// }
// console.log(foo(1, 2))
// console.log(foo(1, 2, 3))

// function foo(x, ...args) {
//     console.log(x, args);
// }
// foo(1, 2)
// foo(1, 2, 3)

let [x, ...y] = [1, 2, 3]
console.log(x); //1
console.log(y); //[2,3]