// 不属于顶层对象window
// 不允许重复声明
// 不存在变量提升
// 暂时性死区
// 块级作用域

// var a = 5 //在当前作用域声明一个变量
// console.log(a); //5
// delete a //delete只能删除属性，不能删除变量
// console.log(a); //5
// // 但是
// console.log(window.a); //5 语言设计的时候把顶层对象的属性和全局变量挂钩了（这样设计败笔，会污染全局变量）
// b = 6 //在window上面定义一个属性
// console.log(b); //6
// delete b
// console.log(b); //报错

// let a = 5
// console.log(a); //5
// console.log(window.a); //undefined 不属于顶层对象window

// var a = 5
// var a = 6
// console.log(a); //6

// let a = 5
// let a = 6
// console.log(a); //'a' has already been declared

// // 变量提升
// console.log(a); //undefined 
// var a = 5
//     // 相当于
// var a
// console.log(a);
// a = 5

// console.log(a);
// let a = 5 //Cannot access 'a' before initialization

// // 暂时性死区：相当于一个封闭的作用域，在这个封闭的作用域里面先使用再声明就会报错
// var a = 5

// {
//     a = 6 //Cannot access 'a' before initialization
//     let a = 6
// }

// function foo1(a = b, b = 2) {
//     console.log(a, b); //Cannot access 'b' before initialization
// }
// foo1()

// function foo2(b = 2, a = b) {
//     console.log(a, b); //Cannot access 'a' before initialization
// }
// foo2()

// 在es5里面只有全局作用域和函数作用域，并没有块级作用域
// for (var i = 0; i < 3; i++) {
//     console.log('内部' + i);
// }
// console.log('外部' + i);

// for (let i = 0; i < 3; i++) {
//     console.log('内部' + i);
// }
// console.log('外部' + i); //i is not defined

// if (false) {
//     var a = 5
// }
// console.log(a); //undefined

// if (true) {
//     let a = 5
// }
// console.log(a); //a is not defined

// if (true) var a = 5
// if (true) let a = 5 // Lexical declaration cannot appear in a single-statement context es6的块级作用域必须是要有大括号的

for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3 3 3
    })
}
for (var i = 0; i < 3; i++) {
    //闭包
    (function(j) {
        setTimeout(function() {
            console.log(j); //0 1 2
        })
    })(i)
}
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0 1 2
    })
}