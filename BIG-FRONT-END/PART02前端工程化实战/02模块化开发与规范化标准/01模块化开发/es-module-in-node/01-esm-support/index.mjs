import { foo, bar } from "./module.mjs";

console.log(foo, bar);

// import fs from "fs";
// fs.writeFileSync("./foo.txt", "es module working");

// 内置模块兼容了ESM的提取成员方式
import { writeFileSync } from "fs";
writeFileSync("./foo.txt", "es module");

import _ from "lodash";
console.log(_.camelCase("ES module"));

// 不支持，因为第三方模块都是导出默认成员
// import { camelCase } from "lodash";
// console.log(camelCase("ES module"));
