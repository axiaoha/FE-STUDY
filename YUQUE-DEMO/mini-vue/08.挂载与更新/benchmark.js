// index.js
var Benchmark = require("benchmark");

function foo() {
  var arr = new Array(10000);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
}

var bench = new Benchmark(
  "foo test", // 测试名
  foo, // 测试内容
  {
    setup: `console.log('start')`, // 每个测试循环开始时调用
    teardown: `console.log('over')`, // 每个测试循环结束时调用
  }
);
bench.run(); // 开始测试

console.log(bench.hz); // 每秒运行数
console.log(bench.stats.moe); // 出错边界
console.log(bench.stats.variance); // 样本方差
