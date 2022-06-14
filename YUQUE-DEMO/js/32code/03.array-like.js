const set = new Set(["foo", "bar", "baz", "foo"]);
const dom = document.querySelectorAll("div");
console.log(set);
console.log(dom);

// ---Set构建出的类数组---

// // 1、Array.from
// const arr = Array.from(set);
// console.log(arr);

// // 2、扩展运算符
// const arr = [...set];
// console.log(arr);

// // 3、Set.prototype.forEach()
// const arr = [];
// set.forEach((s) => {
//   arr.push(s);
// });
// console.log(arr);

// ---Dom类数组---
// // 1、Array.from
// const arr = Array.from(dom);
// console.log(arr);
// // console.log(Array.from(dom));

// // 2、扩展运算符
// const arr = [...dom];
// console.log(arr);
// // console.log([...dom]);

// 3、slice
// const arr = Array.prototype.slice.call(dom);
// console.log(arr);
// // console.log(Array.prototype.slice.call(dom));

// 4、concat
// const arr = Array.prototype.concat.apply([], dom);
// console.log(arr);
// // console.log(Array.prototype.concat.apply([], dom));
