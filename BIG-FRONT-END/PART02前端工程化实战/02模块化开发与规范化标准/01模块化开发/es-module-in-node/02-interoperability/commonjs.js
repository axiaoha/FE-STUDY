// commonJS 模块始终只会导出一个默认成员
// module.exports = {
//   foo: "commonjs exports value",
// };

// exports.bar = "commonjs exports value";
// exports.foo = "commonjs exports value";

// 不能在CommonJS模块中通过require载入ES Module
const mod = require("./es-module.mjs"); // 报错
console.log(mod);
