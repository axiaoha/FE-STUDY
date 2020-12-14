// Promise.all([
//     Promise.resolve({
//         code: 200,
//         data: [1, 2, 3]
//     }),
//     // Promise.resolve({
//     //     code: 200,
//     //     data: [4, 5, 6]
//     // }),
//     Promise.reject({
//         code: 500
//     }),
//     Promise.resolve({
//         code: 200,
//         data: [7, 8, 9]
//     })
// ]).then(res => {
//     console.log(' success');
//     console.log(res);
// }).catch(err => {
//     console.log('fail');
//     console.log(err);
// })

Promise.allSettled([
    Promise.resolve({
        code: 200,
        data: [1, 2, 3]
    }),
    // Promise.resolve({
    //     code: 200,
    //     data: [4, 5, 6]
    // }),
    Promise.reject({
        code: 500
    }),
    Promise.resolve({
        code: 200,
        data: [7, 8, 9]
    })
]).then(res => {
    // console.log(' success');
    // console.log(res);
    const data = res.filter(item => item.status === 'fulfilled')
    console.log(data);
}).catch(err => {
    console.log('fail');
    console.log(err);
})