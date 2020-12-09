// 目的
// 将Object属于语言内部的方法放到Reflect上
// 修改某些Object方法的返回结果，让其变得更加合理
// 让Object操作变成函数行为
// Reflect对象的方法与Proxy对象的方法一一对应

// // es5
// try {
//     Object.defineProperty() //没有返回值
// } catch (e) {}
// //es6
// if (Reflect.defineProperty()) { //有返回值boolean
// } else {}

console.log('assign' in Object); //true 命令式操作
console.log(Reflect.has(Object, 'assign')); //true 函数式操作

let userInfo = {
    username: 'axiaoha',
    age: 23,
    _pwd: '***'
}
userInfo = new Proxy(userInfo, {
    get(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error('不可访问')
        } else {
            // return target[prop]
            return Reflect.get(target, prop)
        }
    },
    set(target, prop, val) {
        if (prop.startsWith('_')) {
            throw new Error('不可访问')
        } else {
            // target[prop] = val
            return Reflect.set(target, prop, val)
            return true
        }
    },
    deleteProperty(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            // delete target[prop]
            Reflect.deleteProperty(target, prop)
            return true
        }
    },
    ownKeys(target, prop) {
        // return Object.keys(target).filter(key => key.startsWith('_'))
        return Reflect.ownKeys(target).filter(key => key.startsWith('_'))
    }
})
userInfo.age = 18
console.log(userInfo.age);
try {
    userInfo._pwd = '###' //会抛出异常
} catch (e) {
    console.log(e.message); //'不可访问'
}
try {
    delete userInfo._pwd //会抛出异常
} catch (e) {
    console.log(e.message); //'不可删除'
}
for (let key in userInfo) {
    console.log(key); //_pwd
}

//apply
let sum = (...args) => {
    let num = 0
    args.forEach(item => {
        num += item
    })
    return num
}
sum = new Proxy(sum, {
    apply(target, ctx, args) {
        // return target(...args) * 2
        return Reflect.apply(target, target, [...args]) * 2
    }
})
console.log(sum(1, 2)); //6
console.log(sum.call(null, 1, 2, 3)); //12
console.log(sum.apply(null, [1, 2, 3])); //12