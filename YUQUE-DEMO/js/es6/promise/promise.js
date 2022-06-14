// ---then方法的链式调用---
// const promise = new Promise((resolve, reject) => {
//   // 目前这里只处理同步的问题
//   resolve("success");
// });
// function other() {
//   return new Promise((resolve, reject) => {
//     resolve("other");
//   });
// }
// promise
//   .then((value) => {
//     console.log(1);
//     console.log("resolve", value);
//     return other();
//   })
//   .then((value) => {
//     console.log(2);
//     console.log("resolve", value);
//   });
// // 1
// // resolve success
// // 2
// // resolve other

// ---then 方法链式调用识别 Promise 是否返回自己---
const promise = new Promise((resolve, reject) => {
  resolve(100);
});
const p1 = promise.then((value) => {
  console.log(value);
  return p1;
});
// [TypeError: Chaining cycle detected for promise #<Promise>]

new Promise((resolve, reject) => {
  resolve(100);
})
  .then((res) => {
    console.log("1", res);
    return 10;
  })
  .then((res) => {
    console.log("2", res);
    return 10;
  });
