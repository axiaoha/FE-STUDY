// dynamic import
// 现代前端打包资源越来越大，打包成几M的JS资源已成常态，而往往前端应用初始化时根本不需要全量加载逻辑资源，
// 为了首屏渲染速度更快，很多时候都是按需加载，比如懒加载图片等。而这些按需执行逻辑资源都体现在某一个事件回调中去加载。

// // export {ajax}
// const oBtn = document.querySelector('#btn')
// oBtn.addEventListener('click', () => {
//     import ('./ajax.js').then(mod => {
//         console.log(mod)
//         mod.ajax('./static/a.json', res => {
//             console.log(res)
//         })
//     })
// })

// export default ajax
const oBtn = document.querySelector('#btn')
oBtn.addEventListener('click', () => {
    import ('./ajax.js').then(mod => {
        console.log(mod)
        mod.default('./static/a.json', res => {
            console.log(res)
        })
    })
})