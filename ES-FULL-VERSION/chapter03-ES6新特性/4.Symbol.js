// 一种新的原始数据类型（before：Undefined/Null/Boolean/String/Number/Object,now：add Symbol）
// 声明方式
// 应用场景

// // Symbol表示独一无二的
// let s1 = Symbol()
// let s2 = Symbol()
// console.log(s1); //Symbol()
// console.log(s2); //Symbol()
// console.log(s1 === s2); //false

// let s1 = Symbol('foo')
// let s2 = Symbol('bar')
// console.log(s1); //Symbol(foo)
// console.log(s2); //Symbol(bar)

// const obj = {
//     name: 'axiaoha',
//     toString() {
//         // 覆盖掉Object.prototype.toString方法
//         return this.name
//     }
// }
// let s = Symbol(obj)
//     // console.log(s); //Symbol([object Object]) 会自动调用 toString方法
// console.log(s); //Symbol(axiaoha)

// let s = Symbol()
// s.name = 'axiaoha'
// console.log(s); //Symbol()

// let s = Symbol('axiaoha')
// console.log(s.description); //'axiaoha'

// Symbol.for在全局登记一个Symbol
// let s1 = Symbol.for('axiaoha')
// let s2 = Symbol.for('axiaoha')
// console.log(s1); //Symbol(axiaoha)
// console.log(s2); //Symbol(axiaoha)
// // s1 s2定义在全局环境中，当再次声明Symbol.for('axiaoha')时，会去前面找description为‘axiaoha’，如果description一致的话，两个变量的指向是一致的
// console.log(s1 === s2); //true

// const s1 = Symbol('foo')
// console.log(Symbol.keyFor(s1)); //undefined
// const s2 = Symbol.for('foo')
//     // 获取全局symbol 注册表中与某个 symbol 关联的键
// console.log(Symbol.keyFor(s2)); //'foo'

// 应用一：
// const grade1 = {
//     张三: { address: 'xxx', tel: '111' },
//     李四: { address: 'yyy', tel: '222' },
//     李四: { address: 'zzz', tel: '333' },
// }
// console.log(grade1);
// // 对象里面key值必须是唯一的，后面定义的会将前面定义的覆盖掉
// // {
// //     张三: { address: "xxx", tel: "111" }
// //     李四: { address: "zzz", tel: "333" }
// // }​

// const stu1 = '李四'
// const stu2 = '李四'
// const grade2 = {
//     张三: { address: 'xxx', tel: '111' },
//     [stu1]: { address: 'yyy', tel: '222' },
//     [stu2]: { address: 'zzz', tel: '333' },
// }
// console.log(grade2);
// // {
// //     张三: { address: "xxx", tel: "111" }
// //     李四: { address: "zzz", tel: "333" }
// // }​

// const stu1 = Symbol('李四')
// const stu2 = Symbol('李四')
// const grade3 = {
//     张三: { address: 'xxx', tel: '111' },
//     [stu1]: { address: 'yyy', tel: '222' },
//     [stu2]: { address: 'zzz', tel: '333' },
// }
// console.log(grade3);
// // {
// //     张三: { address: "xxx", tel: "111" }
// //     Symbol(李四): { address: "yyy", tel: "222" }
// //     Symbol(李四): { address: "zzz", tel: "333" }
// // }
// console.log(grade3[stu1]); //{address: "yyy", tel: "222"}
// console.log(grade3[stu2]); //{address: "zzz", tel: "333"}


// 应用二：
// const sym = Symbol('github')
// class User {
//     constructor(name) {
//         this.name = name
//         this[sym] = 'https://github.com/axiaoha'
//     }
//     getName() {
//         return this.name + '：' + this[sym]
//     }
// }
// const user = new User('axiaoha')
// console.log(user.getName());
// for (let key in user) {
//     console.log(key); //只能打印出不是Symbol的属性
// }
// for (let key of Object.keys(user)) {
//     console.log(key); //只能打印出不是Symbol的属性
// }
// for (let key of Object.getOwnPropertySymbols(user)) {
//     console.log(key); //只能打印出是Symbol的属性
// }
// for (let key of Reflect.ownKeys(user)) {
//     console.log(key); //name Symbol(github) 属性都能打印出来
// }


// 应用三：
// triangle和circle对应的值其实并不重要，因此他们的值可以用Symbol()来代替
const shapeType = {
    // triangle: 'Triangle',
    // circle: 'Circle'
    triangle: Symbol(),
    circle: Symbol()
}

function getArea(shape) {
    let area = 0
    switch (shape) {
        // case 'Triangle':
        case shapeType.triangle:
            area = 1
            break
            // case 'Circle':
        case shapeType.circle:
            area = 2
            break
    }
    return area
}
// 'Triangle'这个字符串可能会在代码中出现多次，这样的字符串被称为魔术字符串，
// 但是这样会导致代码的耦合性极强，代码中应该消除这样子的魔术字符串
// console.log(getArea('Triangle'));
console.log(getArea(shapeType.triangle));