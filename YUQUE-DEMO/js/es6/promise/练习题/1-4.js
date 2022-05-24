const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
queueMicrotask(() => {
  console.log("3", promise2);
});
// promise1
// Promise {<fulfilled>: 'resolve1'}
// Promise {<pending>}
// resolve1
// Promise {<fulfilled>: undefined}
