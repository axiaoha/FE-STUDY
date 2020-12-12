// 如何把一个对象复制给另一个对象
// Object.assign() 是浅拷贝

// let target = {
//     a: {
//         b: {
//             c: 1
//         },
//         e: 4,
//         f: 5,
//         g: 6
//     }
// }
// let source = {
//     a: {
//         b: {
//             c: 1
//         },
//         e: 2,
//         f: 3
//     }
// }
// Object.assign(target, source)
// console.log(target);
// // {
// //     a: b: { c: 1 }
// //     e: 2
// //     f: 3
// // }
// // 没有包含g属性

// // 深拷贝
// let a = 1
// let b = a
// a = 2
// console.log(b); //1 a发生变化并没有影响到b,这就是深拷贝

// //浅拷贝
// let obj1 = {
//     name: 'axiaoha',
//     age: 23
// }
// let obj2 = obj1
// obj1.age = 18
// console.log(obj1.age); //18
// console.log(obj2.age); //18 obj1变化会影响到obj2

// 实现深拷贝
// let obj1 = {
//     name: 'axiaoha',
//     age: 23
// }
// let obj2 = JSON.parse(JSON.stringify(obj1))
// obj1.age = 18
// console.log(obj1.age); //18
// console.log(obj2.age); //23

let checkType = data => {
    return Object.prototype.toString.call(data).slice(8, -1)
}
let deepClone = target => {
    let type = checkType(target)
    let result
    if (type === 'Object') {
        result = {}
    } else if (type === 'Array') {
        result = []
    } else {
        return target
    }
    for (let key in target) {
        let value = target[key]
        let type = checkType(value)
        if (type === 'Object' || type === 'Array') {
            result[key] = deepClone(value)
        } else {
            result[key] = value
        }
    }
    return result
}
let arr1 = [1, 2, { age: 18 }]
let arr2 = deepClone(arr1)
arr2[2].age = 23
console.log(arr1);
console.log(arr2);

let obj1 = {
    name: 'axioaha',
    hoobby: ['coding', 'eating']
}
let obj2 = deepClone(obj1)
obj2.hoobby[0] = 'sleeping'
console.log(obj1);
console.log(obj2);