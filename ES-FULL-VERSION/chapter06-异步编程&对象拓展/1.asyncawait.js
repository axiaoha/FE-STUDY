// function foo() {
//     return 'foo'
// }
// console.log(foo()); //'foo'

// async function foo() {
//     return 'foo'
// }
// console.log(foo()); //返回promise对象

// async function foo() {
//     let result = await 'foo'
//     console.log(result); //'foo'
// }
// foo()

// function timeout(num = 0) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(1);
//             resolve(num)
//         }, 1000)
//     })
// }
// async function foo() {
//     // timeout() //输出顺序为2 1s后输出 2
//     // await timeout() //输出顺序 1s后输出 1 2
//     const res = await timeout(3) //输出顺序为1 3 2
//     console.log(res);
//     console.log(2);
// }
// foo()

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('success')
            reject('fail')
        }, 1000)
    })
}
async function foo() {
    return await timeout()
}
foo().then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err);
})