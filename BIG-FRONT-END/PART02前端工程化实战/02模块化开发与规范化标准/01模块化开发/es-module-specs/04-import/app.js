import { lowercase } from "./utils/index.js";
// import { lowercase } from "/es-module-specs/04-import/utils/index.js"; //绝对路径
// import { lowercase } from "http://localhost:3000/es-module-specs/04-import/utils/index.js";// 完整的url

// 加载模块但是不提取模块内容
// import {} from "./module.js";
// import "./module.js";

// import * as mod from "./module.js";
// console.log(mod);

// 动态导入模块
// 不允许的
// var modulePath = './module.js'
// import { name } from modulePath
// console.log(name);

// if(true){
//   import { name } from "./module.js";
// }

import("./module.js").then(function (module) {
  console.log(module);
});
console.log(lowercase("HHHH"));
