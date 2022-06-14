// 1.  new 的结果是一个新的实例对象
// 2. 该实例对象可以访问到构造函数和Constructor.prototype中的属性
// 3. 如果构造函数返回了一个对象，在实例中只能访问返回的对象中的属性
// 4. 如果构造函数返回的值是不是一个对象，则依旧返回创建的实例对象
function newOperator(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw new TypeError("Type Error");
  }
  var obj = new Object();
  obj.__proto__ = ctor.prototype;
  const res = ctor.apply(obj, args);
  const isObject = typeof res === "object" && res !== null;
  const isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}

function fn(name) {
  this.name = name;
  // return function () {};
}
const obj1 = new fn("axiaoha");
console.log(obj1);
const obj2 = newOperator(fn, "aha");
console.log(obj2);
