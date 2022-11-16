// const obj1 = { label: "Proxy" };
// var obj = new Proxy(obj1, {
//   // receiver: proxy 实例本身
//   get: function (target, propKey, receiver) {
//     console.log(
//       `getting ${propKey}!`,
//       target,
//       receiver,
//       obj1 === target,
//       obj === receiver
//     );
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   },
// });

// console.log(obj.label);

const obj1 = { a: { label: "Proxy" } };
var obj = new Proxy(obj1, {
  // receiver: proxy 实例本身
  get: function (target, propKey, receiver) {
    console.log("get");
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log("set");
    return Reflect.set(target, propKey, value, receiver);
  },
});

console.log(obj.a.label);
obj.a.label = "new";
