var name = "jack";
var age = 18;
var obj = { name, age };
// 1、export {}只是语法，和对象的属性的简洁表示法不一样 import {}同理
// // 导出一个对象
// export default {
//   name,
//   age,
// };
// 2、导出的是成员的引用,不能在模块的外部去修改成员
export { name, age };

setTimeout(function () {
  name = "ben";
}, 1000);
