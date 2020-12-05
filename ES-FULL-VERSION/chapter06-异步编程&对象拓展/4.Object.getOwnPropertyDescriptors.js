// 一个属性描述符是一个记录，由下面属性当中的某些组成的：
// value
// 该属性的值(仅针对数据属性描述符有效)
// writable
// 当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
// get
// 获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
// set
// 获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
// configurable
// 当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
// enumerable
// 当且仅当指定对象的属性可以被枚举出时，为 true。
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor

const obj1 = {get foo() { return 23; } };
const descriptor1 = Object.getOwnPropertyDescriptor(obj1, "foo");
console.log(descriptor1);
// {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }

const obj2 = { bar: 42 };
const descriptor2 = Object.getOwnPropertyDescriptor(obj2, "bar");
console.log(descriptor2);
// {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

const obj3 = {};
Object.defineProperty(obj3, "baz", {
    value: 8675309,
    writable: false,
    enumerable: false
});
const descriptor3 = Object.getOwnPropertyDescriptor(obj3, "baz");
console.log(descriptor3);
// {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }