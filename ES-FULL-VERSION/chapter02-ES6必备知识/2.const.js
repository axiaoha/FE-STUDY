// // es5定义一个常量
// Object.defineProperty(window, 'PI', {
//     value: 3.14,
//     writable: false
// })
// console.log(PI); //3.14
// PI = 5
// console.log(PI); //3.14

// const a = 5
// a = 6 //报错： Assignment to constant variable.

// const a
// a = 5 //报错：Missing initializer in const declaration

// {
//     console.log(a);
//     const a = 5 //报错：Cannot access 'a' before initialization
// }

const obj = {
    name: 'axiaoha',
    age: 23,
    skill: {
        name: 'code',
        year: 1
    }
}
console.log(obj); //{name: "axiaoha", age: 23}
// 可以冻结对象，只会冻结最外层，浅层次的冻结
Object.freeze(obj)
obj.tech = 'FE'
obj.skill.year = 2 //obj.skill没有被冻结
console.log(obj); //{name: "axiaoha", age: 23}
// 栈内存： 存放一些基础类型(String Number Boolean null undefined) 和引用类型(Object) 的引用地址
// 堆内存： 存放引用类型的内容