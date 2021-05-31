// import mod from "./commonjs.js";
// console.log(mod);

// 不能直接提取成员，注意import不是解构导出对象
// import { bar, foo } from "./commonjs.js"; //报错
// import mod from "./commonjs.js";
// console.log(mod.bar, mod.foo);

export const foo = "commonjs exports value";
