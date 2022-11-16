// // Reflect.get(target, name, receiver)
// const obj = {
//   foo: 1,
//   get bar() {
//     return this.foo;
//   },
// };
// console.log(Reflect.get(obj, "foo", { foo: 2 })); //1
// // 如果属性部署了读取函数（getter），则读取函数的this绑定receiver。
// console.log(Reflect.get(obj, "bar", { foo: 2 })); //2

const obj = {
  foo: 2,
};
const functions = {
  a() {
    return this.foo;
  },
};
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    if (functions.hasOwnProperty(key)) {
      return Reflect.get(functions, key, receiver);
    }
    return Reflect.get(target, key, receiver);
  },
});
console.log(proxy.a());

// // Reflect.set(target, name, value, receiver)
// const myObject = {
//   foo: 1,
//   set bar(value) {
//     return (this.foo = value);
//   },
// };
// const receiver = {
//   foo: 1,
// };
// console.log(myObject.foo); // 1

// Reflect.set(myObject, "foo", 2, receiver);
// console.log(myObject.foo); // 1
// console.log(receiver.foo); // 2

// Reflect.set(myObject, "bar", 3, receiver);
// console.log(myObject.foo); // 1
// console.log(receiver.foo); // 3
