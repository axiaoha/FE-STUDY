// this指向定义时所在的对象，而不是调用时所在的对象
// 不可以当作构造函数
// 不可以使用arguments对象

// console.log(sum(1, 2)) //3 函数预定义
// function sum(x, y) {
//     return x + y
// }
// console.log(sum(1, 2)); //3

// console.log(sum(1, 2)); //报错：sum is not a function
// var sum = function(x, y) {
//     return x + y
// }
// console.log(sum(1, 2));

// let sum = (x, y) => {
//         return x + y
//     }
//     // let sum = (x, y) => x + y
// console.log(sum(1, 2));

// let btn = document.querySelector('#btn')
// btn.addEventListener('click', function() {
//     console.log(this); //#btn
//     setTimeout(function() {
//         console.log(this); //window
//     }, 1000)
//     setTimeout(function() {
//         console.log(this); //#btn
//     }.bind(this), 1000)
//     setTimeout(() => {
//         console.log(this); //#btn
//     }, 1000)
// })

// function People(name, age) {
//     this.name = name
//     this.age = age
// }
// let p = new People('axiaoha', 23)
// console.log(p);

// let People = (name, age) => {
//     this.name = name
//     this.age = age
// }
// let p = new People('axiaoha', 23) //报错：People is not a constructor
// console.log(p);

// let foo = (...args) => {
//     console.log(args); //[1,2,3]
//     console.log(arguments); //arguments is not defined
// }
// foo(1, 2, 3)