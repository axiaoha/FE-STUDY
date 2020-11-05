// -----------------Promise.all Promise.race-----------------
// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(1);
//     resolve("1成功");
//   }, 2000);
// });
// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(2);
//     // resolve("2成功");
//     reject("2失败");
//   }, 1000);
// });
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(3);
//     resolve("3成功");
//   }, 3000);
// });

// // Promise.all([p1, p2, p3]).then(
// //   (res) => {
// //     console.log("res", res);//所有的都成功了，才会进入then第一个回调函数里面
// //   },
// //   (err) => {
// //     console.log(err); //只要有一个失败了，会被认为所有的都失败了，就会进入then第二个回调函数里面了
// //   }
// // );

// Promise.race([p1, p2, p3]).then(
//   (res) => {
//     console.log("res", res); //只要有一个成功了，所有的都认为是成功了，会进入then第一个回调函数里面
//   },
//   (err) => {
//     console.log(err); //只要有一个失败了，所有的都认为是失败了，会进入then第二个回调函数里面
//   }
// );

// Promise.all和Promise.race应用场景
// 关于Promise.all 图片上传
const imgArr = ["1.jpg", "2.jpg", "3.jpg"];
let promiseArr = [];
imgArr.forEach((item) => {
  promiseArr.push(
    new Promise((resolve, reject) => {
      //图片上传操作
      resolve();
    })
  );
});
Promise.all(promiseArr).then((res) => {
  //插入数据库的操作
  console.log("图片全部上传完成");
});

// 关于Promise.race  加载图片
function getImg() {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = function () {
      resolve(img);
    };
    // img.src = "http://xxx.com/xxx.jpg";//这是一张不存在的图片
    img.src =
      "https://img3.mukewang.com/szimg/5d8b21f2088cf47501400140-360-202.jpg";
  });
}
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("图片请求超时"); //说明图片加载超时了
    }, 2000);
  });
}

Promise.race([getImg(), timeout()]).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
