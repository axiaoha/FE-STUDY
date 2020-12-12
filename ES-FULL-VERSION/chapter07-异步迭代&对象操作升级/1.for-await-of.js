// let arr = ['es6', 'es7', 'es8', 'es9']
// arr[Symbol.iterator] = function() {
//     let nextIndex = 0
//     return {
//         next() {
//             return nextIndex < arr.length ? {
//                 value: arr[nextIndex++] + '-personal',
//                 done: false
//             } : {
//                 value: undefined,
//                 done: true
//             }
//         }
//     }
// }
// for (let item of arr) {
//     console.log(item);
// }


function getPromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ value: time, done: false })
        }, time)
    })
}
let arr = [getPromise(1000), getPromise(2000), getPromise(3000)]
    // for (let item of arr) {
    //     console.log(item); //promise的状态都是pending 会瞬间执行完，并不会等到异步操作完才执行下一步操作
    // }
arr[Symbol.asyncIterator] = function() {
    let nextIndex = 0
    return {
        next() {
            return nextIndex > arr.length ? arr[nextIndex++] : Promise.resolve({
                value: undefined,
                done: true
            })
        }
    }
}
async function test() {
    for (let item of arr) {
        console.log(await item);
    }
}
test()

// function Gen(time) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve(time)
//         }, time)
//     })
// }
// async function test() {
//     let arr = [Gen(2000), Gen(100), Gen(3000)]
//     for await (let item of arr) {
//         console.log(Date.now(), item) //时间戳  time
//     }
//     // for (let item of arr) {
//     //     console.log(Date.now(), item, await item) //时间戳 promise对象 time
//     //         // console.log(Date.now(), item, await item.then((time) => { console.log('1', time) }))
//     // }
// }
// test()