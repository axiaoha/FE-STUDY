import { name, age } from "./module.js";
console.log(name, age);

// name = "tom"; // 报错Assignment to constant variable.

setTimeout(function () {
  console.log(name, age);
}, 1500);
