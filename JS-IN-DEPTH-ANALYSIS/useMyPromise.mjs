// 1、promise就是一个类，在执行这个类的时候需要传递一个执行器进去，执行器会立即执行
// 2、promise中有三种状态，分别为fulfilled、rejected、pending
//     pending -> fulfilled
//     pending -> rejected
//     一旦状态确定就不可更改
// 3、resolve和reject函数是用来更改状态的
//     resolve：pending -> fulfilled
//     reject： pending -> rejected
// 4、then内部做的事情是判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数，then方法定义再原型对象中
// 5、then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
// 6、加入异步逻辑
// 7、实现then方法多次调用添加多个处理函数
// 8、then方法是可以被链式调用的，后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
// 9、then方法链式调用识别Promise对象自返回
// 10、捕获错误及then链式调用其他状态代码补充
// 11、将then方法的参数变成可选参数
// 12、Promise.all方法的实现
// 13、Promise.resolve方法的实现
// 14、finally方法的实现
// 15、catch方法的实现

// node --experimental-modules xxx.mjs
import MyPromise from "./myPromise.mjs";

// let promise = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   resolve("成功");
//   // }, 2000);
//   // reject("失败");
// });
// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve("other");
//   });
// }
// promise
//   .then((value) => {
//     console.log(1);
//     console.log(value);
//     // return 100;
//     return other();
//   })
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

// Promise对象自调用
// let p = promise.then((value) => {
//   console.log(value);
//   return p;
// });
// p.then(
//   (value) => {},
//   (reason) => {
//     console.log(reason.message);
//   }
// );

// 捕获错误
// let promise = new MyPromise((resolve, reject) => {
//   // throw new Error("executor error");
//   resolve("成功");
// });
// promise
//   .then(
//     (value) => {
//       console.log(value);
//       throw new Error("then error");
//     },
//     (reason) => {
//       console.log(reason.message);
//     }
//   )
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log("aaaaa");
//       console.log(reason.message);
//     }
//   );

// let promise = new MyPromise((resolve, reject) => {
//   reject("失败");
// });
// promise
//   .then(
//     (value) => {
//       console.log(value);
//       throw new Error("then error");
//     },
//     (reason) => {
//       console.log(reason);
//       return 1000;
//     }
//   )
//   .then((value) => {
//     console.log(value);
//   });

// let promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("成功");
//   }, 2000);
// });
// promise
//   .then((value) => {
//     console.log(value);
//     return 1000;
//   })
//   .then((value) => {
//     console.log(value);
//   });

// 11、将then方法的参数变成可选参数
// let promise = new MyPromise((resolve, reject) => {
//   reject("失败");
// });
// promise
//   .then()
//   .then()
//   .then(
//     (value) => console.log(value),
//     (reason) => {
//       console.log(reason);
//     }
//   );
// // 等价于
// // promise
// //   .then((value) => value)
// //   .then((value) => value)
// //   .then((value) => console.log(value));

// 12、Promise.all方法的实现
// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve("other");
//   });
// }
// function p1() {
//   return new MyPromise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve("p1");
//     }, 2000);
//   });
// }
// function p2() {
//   return new MyPromise(function (resolve, reject) {
//     resolve("p2");
//     // resolve(other());
//   });
// }
// MyPromise.all(["a", "b", p1(), p2(), "c"]).then((result) => {
//   console.log(result); //["a", "b", "p1", "p2", "c"]
// });

// 13、Promise.resolve方法的实现
// function p() {
//   return new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve("hello");
//     }, 2000);
//   });
// }
// MyPromise.resolve(10).then((value) => console.log(value));
// MyPromise.resolve(p()).then((value) => console.log(value));

// 14、finally方法的实现
// function p1() {
//   return new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve("p1");
//     }, 2000);
//   });
// }
// function p() {
//   return new MyPromise(function (resolve, reject) {
//     reject("失败");
//   });
// }
// p()
//   .finally(() => {
//     console.log("finally");
//     return p1();
//   })
//   .then(
//     (value) => {
//       console.log(value);
//     },
//     (reason) => {
//       console.log(reason);
//     }
//   );

// 15、catch方法的实现
function p() {
  return new MyPromise((resolve, reject) => {
    reject("失败");
  });
}
p()
  .then((value) => console.log(value))
  .catch((reason) => console.log(reason));
