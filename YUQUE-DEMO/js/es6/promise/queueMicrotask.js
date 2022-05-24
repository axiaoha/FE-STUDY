let callback = () => console.log("Regular timeout callback has run");

let urgentCallback = () =>
  console.log("*** Oh noes! An urgent callback has run!");

console.log("Main program started");
setTimeout(callback, 0);
// 创建微任务
queueMicrotask(urgentCallback);
console.log("Main program exiting");
