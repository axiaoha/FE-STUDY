// let promise = new Promise((resolve, reject) => {
//   // setTimeout(() => {
//   // resolve("成功");
//   reject("失败");
//   // }, 2000);
// });
// function other() {
//   return new Promise((resolve, reject) => {
//     resolve("other");
//   });
// }
// promise
//   .then(
//     (value) => {
//       console.log(1);
//       console.log(value);
//       // return 100;
//       return other();
//     },
//     (reason) => {
//       console.log(reason);
//       return 1000;
//     }
//   )
//   .then((value) => {
//     console.log(value);
//   });
// promise.then((value) => {
//   console.log(2);
//   console.log(value);
// });
// promise.then((value) => {
//   console.log(3);
//   console.log(value);
// });

// promsie对象自返回
// let p = promise.then((value) => {
//   return p;
// });
// .catch((reason) => {
//   console.log("inner", reason.message);
// });
// p.catch((reason) => {
//   console.log("outside", reason.message);
// });

// 11、将then方法的参数变成可选参数
// let promise = new Promise((resolve, reject) => {
//   resolve(100);
// });
// promise
//   .then()
//   .then()
//   .then((value) => console.log(value));

// 12、Promise.all方法的实现
// function other() {
//   return new Promise((resolve, reject) => {
//     resolve("other");
//   });
// }
// function p1() {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve("p1");
//     }, 2000);
//   });
// }
// function p2() {
//   return new Promise(function (resolve, reject) {
//     resolve("p2");
//     // resolve(other());
//   });
// }
// Promise.all(["a", "b", p1(), p2(), "c"]).then((result) => {
//   console.log(result); //["a", "b", "p1", "p2", "c"]
// });

// 13、Promise.resolve方法的实现
// function p() {
//   return new Promise(function (resolve, reject) {
//     resolve("hello");
//   });
// }
// Promise.resolve(10).then((value) => console.log(value));
// Promise.resolve(p()).then((value) => console.log(value));

// 14、finally方法的实现
function p() {
  return new Promise(function (resolve, reject) {
    resolve("hello");
  });
}
p()
  .finally(() => {
    console.log("finally");
  })
  .then((value) => console.log(value));
