// Javascript 在不同的环境获取全局对象有不通的方式：
// node 中通过 global
// web 中通过 window, self 等.

// window对象的常用方法和函数都可以用self代替window
// self.setTimeout(() => {
//     console.log(123)
// }, 1000)

const getGlobal = () => {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    throw new Error('无法找到全局对象')
}
const globals = getGlobal()
console.log(globals)

// globalThis 提供了一个标准的方式来获取不同环境下的全局 this 对象（ 也就是全局对象自身）。 
// 不像 window 或者 self 这些属性， 它确保可以在有无窗口的各种环境下正常工作。
console.log(globalThis)