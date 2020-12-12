// 参数的默认值
// 与解构赋值结合
// length属性
// 作用域
// 函数的name属性

// function foo(x, y) {
//     y = y || 'world'
//     console.log(x, y);
// }
// foo('hello', 'axiaoha')
// foo('hello', 0)

// function foo(x, y = "world") {
//     console.log(x, y);
// }
// foo('hello')
// foo('hello', 0)

// function foo(x = 5) {
//     // 形参x会被默认声明，所以不能再使用let或者const声明
//     // let x = 1
//     // const x = 1
// }
// foo('hello')

// function foo(x, y = 3, z) {
//     // 参数有默认值的话需要放在最后面
// }
// foo(1, , 0)

// function foo({ x, y = 3 }) {
//     console.log(x, y);
// }
// foo({})
//     // foo( //报错

// function ajax(url, {
//     body = '',
//     method = 'GET',
//     headers = {}
// } = {}) {
//     console.log(method);
// }
// ajax('https://github.com/axiaoha', {
//     method: 'POST'
// })
// ajax('https://github.com/axiaoha')

// function foo(x = 1, y = 2, z = 3) {
//     console.log(x, y, z);
// }
// console.log(foo.length); //0 返回的时没有默认值的参数

// 作用域
// let x = 1
// function foo(x, y = x) {
//     console.log(y);
// }
// foo(2)

// let x = 1
// function foo(y = x) {
//     let x = 2
//     console.log(y); //1
// }
// foo()

// function foo(y = x) { //x is not defined
//     let x = 2
//     console.log(y);
// }
// foo()

// console.log((new Function()).name); //anonymous

function foo(x, y) {
    console.log(this, x, y);
}
console.log(foo.bind({ name: 'axiaoha' }, 1, 2).name) //bound foo
console.log(function() {}.bind({}).name); //bound