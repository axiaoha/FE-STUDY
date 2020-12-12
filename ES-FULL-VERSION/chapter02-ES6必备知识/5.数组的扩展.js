// 类数组/伪数组
// Array.from
// Array.of
// copyWithin
// fill
// includes

// let divs = document.getElementsByTagName('div')
// console.log(divs); //不是数组 HTMLCollection
// console.log(divs instanceof Array); //false
// console.log(divs.length); //1
// // divs.push(123)//报错：divs.push is not a function
// let arr = Array.prototype.slice.call(divs)
// console.log(arr);
// arr.push(123)
// console.log(arr);

// function foo() {
//     console.log(arguments instanceof Array); //false
// }
// foo(1, 'axiaoha', true)

// let arrayLike = {
//     0: 'es6',
//     // 1: 'es7',
//     2: 'es8',
//     length: 3
// }
// let arr = Array.from(arrayLike)
// arr.push('es9')
// console.log(arr);

// let arr = new Array(3)
// console.log(arr);

// let arr = Array.of(1, 2)
// console.log(arr); //[1, 2]
// let arr = Array.of(3)
// console.log(arr); //[3]

// let arr = [1, 2, 3, 4, 5]
// console.log(arr.copyWithin(1, 3));

// let arr = new Array(3).fill(7)
// console.log(arr); //[7,7,7]
// arr.fill('axiaoha', 1, 3)
// console.log(arr);

let arr = [1, 2, 3, NaN]
console.log(arr.indexOf(2)); //1
console.log(arr.indexOf(4)); //-1
console.log(arr.indexOf(NaN)); //-1
console.log(NaN == NaN); //fasle
console.log(arr.includes(NaN)); //true