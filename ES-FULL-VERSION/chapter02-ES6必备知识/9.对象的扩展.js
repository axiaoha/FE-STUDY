// let name = 'axiaoha'
// let age = 23
// let tech = 'FE'
// let obj = {
//     // name: name,
//     // age: age,
//     // study: function() {
//     //     console.log(this.name + '正在学习');
//     // },
//     name,
//     age,
//     study() {
//         let foo = () => {
//             console.log(this);
//         }
//         foo()
//         console.log(this.name + '正在学习');
//     },
//     [tech]: 'es'
// }
// console.log(obj);
// obj.study()

// Object.is()
// console.log(2 == '2'); //true
// console.log(Object.is(2, '2')); //false
// console.log(Object.is(NaN, NaN)); //true
// console.log(Object.is(+0, -0)); //false

// let obj1 = {
//         name: 'axiaoha',
//         age: 23
//     }
//     // let obj2 = {
//     //     name: 'axiaoha',
//     //     age: 23
//     // }
//     // console.log(Object.is(obj1, obj2)); //false
// let obj2 = obj1
// console.log(obj1 == obj2); //true
// console.log(Object.is(obj1, obj2)); //true

// // 扩展运算符与Object.assign()
// let x = {
//     a: 3,
//     b: 4
// }
// let y = {
//     c: 5,
//     a: 6
// }
// Object.assign(y, x)
// console.log(y); //{c: 5, a: 3, b: 4}
// console.log('a' in x); //true

// 对象的遍历方式
let obj = {
    name: 'axiaoha',
    age: 23
}
for (let key in obj) {
    console.log(key, obj[key]);
}
Object.keys(obj).forEach(key => {
    console.log(key, obj[key]);
})
Object.getOwnPropertyNames(obj).forEach(key => {
    console.log(key, obj[key]);
})
Reflect.ownkeys(obj).forEach(key => {
    console.log(key, obj[key]);
})