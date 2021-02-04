const EventEmitter = require("events").EventEmitter;

// const emitter = new EventEmitter();
// // 监听 some 事件
// emitter.on("some", (info) => {
//   console.log("fn1", info);
// });
// // 监听 some 事件
// emitter.on("some", (info) => {
//   console.log("fn2", info);
// });
// // 触发 some 事件
// emitter.emit("some", "xxxx");

// // 继承
// class Dog extends EventEmitter {
//   constructor(name) {
//     super();
//     this.name = name;
//   }
// }
// let simon = new Dog("simon");
// simon.on("bark", function () {
//   console.log(this.name, " barked");
// });
// setInterval(function () {
//   simon.emit("bark");
// }, 1000);

// // stream 用到自定义事件
// const fs = require("fs");
// const readStream = fs.createReadStream("./assets/file/bigfile.txt");
// let length = 0;
// readStream.on("data", function (chunk) {
//   let len = chunk.toString().length;
//   console.log("len", len);
//   length += len;
// });
// readStream.on("end", function () {
//   console.log("length", length);
// });

const fs = require("fs");
const readLine = require("readline");
let rl = readLine.createInterface({
  input: fs.createReadStream("./assets/file/bigfile.txt"),
});
let lineNum = 0;
rl.on("line", function (line) {
  lineNum++;
});
rl.on("close", function () {
  console.log("lineNum", lineNum);
});
