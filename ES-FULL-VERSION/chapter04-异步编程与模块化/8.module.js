// 模块
// // 分开导出
// export const a = 5
// export const b = "axiaoha"
// export const sum = (x, y) => x + y
// export const obj = {
//     name: "axiaoha"
// }

// 一次导出
const a = 5
const b = "axiaoha"
const sum = (x, y) => x + y
const obj = {
        name: "axiaoha"
    }
    // export {
    //     a,
    //     b,
    //     sum,
    //     obj
    // }

const def = "export default value"
    // export default def

export default {
    a,
    b,
    sum,
    obj,
    def
}

// export 和 export default的区别
// export可以多次使用，export default只能使用一次
// export可以连带变量声明，export default不行(export default const def = "export default value"会报错)