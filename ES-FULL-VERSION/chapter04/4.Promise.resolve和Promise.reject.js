// // -----------------Promise.resolve Promise.reject-----------------
// let p1 = Promise.resolve("success");
// console.log("promise p1", p1);
// p1.then((res) => {
//   console.log(res);
// });

// let p2 = Promise.reject("fail");
// console.log("promise p2", p2);
// p2.catch((err) => {
//   console.log(err);
// });

// // Promise.resolve和Promise.reject应用场景
function foo(flag) {
  if (flag) {
    return new Promise((resolve) => {
      resolve("success");
    });
  } else {
    //   return 'fail' //会报错
    return Promise.reject("fail");
  }
}
foo(false).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
