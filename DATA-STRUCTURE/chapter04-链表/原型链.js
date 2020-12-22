// 原型链的本质是链表
// 原型链上的节点是各种原型对象，比如：
// Function.prototype、Object.prototype
// 原型链通过__proto__属性连接各种原型对象（链表是通过next连接其他对象）

// obj->Object.prototype->null
// func->Function.prototype->Object.prototype->null
// arr->Array.prototype->Object.prototype->null

// const obj = {};
// const func = () => {};
// const arr = [];
// console.log(obj.__proto__ === Object.prototype); //true
// console.log(func.__proto__ === Function.prototype); //true
// console.log(arr.__proto__ === Array.prototype); //true

// 原型链知识点：
// 如果A沿着原型链能找到B.prototype，那么A instanceof B 为true

// // 如果在A对象上没有找到x属性，那么会沿着原型链找x属性
// const obj = {};
// Object.prototype.x = "x";
// const func = () => {};
// Function.prototype.y = "y";
// console.log(obj.x);
// console.log(func.y);

// // instanceof的原理，并用代码实现（遍历A的原型链，如果找B的原型，则返回true）
// const instanceOf = (A, B) => {
//   let p = A;
//   while (p) {
//     if (p === B.prototype) {
//       return true;
//     }
//     p = p.__proto__;
//   }
//   return false;
// };
// let B = function () {};
// let A = new B();
// console.log(instanceOf(A, B));

var foo = {};
var F = function () {};
Object.prototype.a = "value a";
Function.prototype.b = "value b";
console.log(foo.a); //value a
console.log(foo.b); //undefined
console.log(F.a); //value a
console.log(F.b); //value b
