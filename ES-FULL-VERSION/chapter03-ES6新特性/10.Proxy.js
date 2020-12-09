// 在目标对象之前架设一层拦截，当外界访问该对象时必须经过这一层拦截

// // es5拦截
// let obj = {}
// let newVal = 'axiaoha'
// Object.defineProperty(obj, 'name', {
//     get() {
//         console.log("get");
//         return newVal
//     },
//     set(val) {
//         console.log('set');
//         newVal = val
//     }
// })
// console.log(obj.name);
// obj.name = 'zerobeak'
// console.log(obj.name);

// ES6拦截 proxy
// let obj = {}
// let p = new Proxy(obj, {})
// console.log(p);
// p.name = 'axiaoha' //将操作直接转发给了obj
// console.log(obj.name); //axiaoha
// for (let key in obj) {
//     console.log(key); //name
// }


// //get
// let arr = [7, 8, 9]
// arr = new Proxy(arr, {
//     get(target, prop) {
//         console.log(target, prop); //[7, 8, 9]    '1'
//         console.log(prop in target); //true
//         return prop in target ? target[prop] : 'error'
//     }
// })
// console.log(arr[1]); //8
// console.log(arr[10]); //error

// let dict = {
//     'hello': '你好',
//     'world': '世界',
// }
// let dict1 = new Proxy(dict, {
//     get(target, prop) {
//         return prop in target ? target[prop] : prop
//     }
// })
// console.log(dict['hi']); //undefined
// console.log(dict1['hi']); //hi
// console.log(dict1['world']); //世界
// console.log(dict1['hello']) //你好

// // set
// let arr = []
// arr = new Proxy(arr, {
//     set(target, prop, val) {
//         if (typeof val === 'number') {
//             target[prop] = val
//             return true
//         } else {
//             return false
//         }
//     }
// })
// arr.push(5)
// arr.push(6)
// console.log(arr[0]);

// // has
// let range = {
//     start: 1,
//     end: 5
// }
// range = new Proxy(range, {
//     has(target, prop) {
//         return prop >= target.start && prop <= target.end
//     }
// })
// console.log(2 in range); //true
// console.log(9 in range); //false

//ownKeys
// let obj = {
//     name: 'axiaoha',
//     [Symbol('es')]: 'es6'
// }
// console.log(Object.getOwnPropertyNames(obj)); //['name']
// console.log(Object.getOwnPropertySymbols(obj));
// console.log(Object.keys(obj));
// for (let key in obj) {
//     console.log(key);
// }
// let userInfo = {
//     username: 'axiaoha',
//     age: 23,
//     _pwd: '***'
// }
// userInfo = new Proxy(userInfo, {
//     ownKeys(target, prop) {
//         return Object.keys(target).filter(key => key.startsWith('_'))
//     }
// })
// for (let key in userInfo) {
//     console.log(key); //_pwd
// }
// console.log(Object.keys(userInfo)) //["_pwd"]

// let userInfo = {
//     username: 'axiaoha',
//     age: 23,
//     _pwd: '***'
// }
// userInfo = new Proxy(userInfo, {
//     get(target, prop) {
//         if (prop.startsWith('_')) {
//             throw new Error('不可访问')
//         } else {
//             return target[prop]
//         }
//     },
//     set(target, prop, val) {
//         if (prop.startsWith('_')) {
//             throw new Error('不可访问')
//         } else {
//             target[prop] = val
//             return true
//         }
//     },
//     deleteProperty(target, prop) {
//         if (prop.startsWith('_')) {
//             throw new Error('不可删除')
//         } else {
//             delete target[prop]
//             return true
//         }
//     },
//     ownKeys(target, prop) {
//         return Object.keys(target).filter(key => key.startsWith('_'))
//     }
// })
// userInfo.age = 18
// console.log(userInfo.age);
// try {
//     userInfo._pwd = '###' //会抛出异常
// } catch (e) {
//     console.log(e.message); //'不可访问'
// }
// try {
//     delete userInfo._pwd //会抛出异常
// } catch (e) {
//     console.log(e.message); //'不可删除'
// }
// for (let key in userInfo) {
//     console.log(key); //_pwd
// }

// //apply
// let sum = (...args) => {
//     let num = 0
//     args.forEach(item => {
//         num += item
//     })
//     return num
// }
// sum = new Proxy(sum, {
//     apply(target, ctx, args) {
//         return target(...args) * 2
//     }
// })
// console.log(sum(1, 2)); //6
// console.log(sum.call(null, 1, 2, 3)); //12
// console.log(sum.apply(null, [1, 2, 3])); //12

// construct new 
let User = class {
    constructor(name) {
        this.name = name
    }
}
User = new Proxy(User, {
    construct(target, args, newTarget) {
        console.log('construct');
        return new target(...args)
    }
})
console.log(new User('axiaoha'));