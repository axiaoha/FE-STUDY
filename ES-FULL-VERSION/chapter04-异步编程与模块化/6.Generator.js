// function foo() {
//   for (let i = 0; i < 3; i++) {
//     console.log(i);
//   }
// }
// foo();

function* foo() {
  for (let i = 0; i < 3; i++) {
    console.log(i);
    yield i;
  }
}
console.log(foo());
// // generator函数（不能作为构造器函数，yield只能放在generator函数里面）并不会立即执行，而是返回一个迭代器对象
// let f = foo();
// console.log(f.next()); //{value: 0, done: false}
// console.log(f.next()); //{value: 1, done: false}
// console.log(f.next()); //{value: 2, done: false}
// console.log(f.next()); //{value: undefined, done: true}

// function* gen(args){
//     args.forEach(item=>{
//         yield item+1//yield只能放在generator函数里面,这里是箭头函数,会报错Unexpected identifier
//     })
// }

// function* gen(x) {
//   let y = 2 * (yield x + 1);
//   let z = yield y / 3;
//   return x + y + z;
// }
// let g = gen(5);
// // next()里面传的参数表示上一次yield的返回值
// // console.log(g.next());
// // console.log(g.next());
// // console.log(g.next());
// console.log(g.next());//6
// console.log(g.next(12));//8 (2*12)/3 12表示yield x + 1的返回值
// console.log(g.next(13));//42  5+2*12+13

// // 应用：打印7的倍数
// function* count(x = 1) {
//   while (true) {
//     if (x % 7 === 0) {
//       yield x;//没有generator会是个死循环
//     }
//     x++;
//   }
// }
// let n = count();
// console.log(n.next().value);
// console.log(n.next().value);
// console.log(n.next().value);
// console.log(n.next().value);
// console.log(n.next().value);
// console.log(n.next().value);

// //ajax
// function ajax(url, callback) {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open("GET", url, true);
//   xmlhttp.send();
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//       callback(xmlhttp.responseText);
//     }
//   };
// }
// function request(url) {
//   ajax(url, (res) => {
//     getData.next(res);
//   });
// }
// function* gen() {
//   let res1 = yield request("static/a.json");
//   console.log("res1", res1);
//   let res2 = yield request("static/b.json");
//   console.log("res2", res2);
//   let res3 = yield request("static/c.json");
//   console.log("res3", res3);
// }
// let getData = gen();
// getData.next();
