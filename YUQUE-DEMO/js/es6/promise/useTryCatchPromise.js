const tryCatchPromise = require("./try-catch-promise");

// // 1、捕获执行器异常
// const promise = new tryCatchPromise((resolve, reject) => {
//   // resolve('success')
//   throw new Error("执行器错误");
// });
// promise.then(
//   (value) => {
//     console.log("resolve", value);
//   },
//   (reason) => {
//     console.log(reason.message);
//   }
// );

// //  2、then 执行的时错误捕获
// const promise = new tryCatchPromise((resolve, reject) => {
//   resolve("success");
// });
// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise
//   .then(
//     (value) => {
//       console.log(1);
//       console.log("resolve", value);
//       throw new Error("then error");
//     },
//     (reason) => {
//       console.log(2);
//       console.log(reason.message);
//     }
//   )
//   .then(
//     (value) => {
//       console.log(3);
//       console.log(value);
//     },
//     (reason) => {
//       console.log(4);
//       console.log(reason.message);
//     }
//   );

// 3、then参数可选
// const promise = new tryCatchPromise((resolve, reject) => {
//   resolve("succ");
// });
// promise
//   .then()
//   .then()
//   .then((value) => console.log(value));

// const promise = new tryCatchPromise((resolve, reject) => {
//   reject("err");
// });
// promise
//   .then()
//   .then()
//   .then(
//     (value) => console.log(value),
//     (reason) => console.log(reason)
//   );

// const promise1 = new tryCatchPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//     console.log("timer1");
//   }, 1000);
//   console.log("promise1里的内容");
// });
// const promise2 = promise1.then(() => {
//   throw new Error("error!!!");
// });
// console.log("promise1", promise1);
// console.log("promise2", promise2);
// setTimeout(() => {
//   console.log("timer2");
//   console.log("promise1", promise1);
//   console.log("promise2", promise2);
// }, 2000);

// tryCatchPromise
//   .resolve("1")
//   .then((res) => {
//     console.log(res);
//   })
//   .finally(() => {
//     console.log("finally");
//   });
// tryCatchPromise
//   .resolve("2")
//   .finally(() => {
//     console.log("finally2");
//     return "我是finally2返回的值";
//   })
//   .then((res) => {
//     console.log("finally2后面的then函数", res);
//   });

tryCatchPromise
  .resolve("1")
  .finally(() => {
    console.log("finally1");
    throw new Error("我是finally中抛出的异常");
  })
  .then((res) => {
    console.log("finally后面的then函数", res);
  })
  .catch((err) => {
    console.log("捕获错误", err);
  });
