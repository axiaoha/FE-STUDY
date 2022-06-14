Function.prototype.apply = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  context = context || window;
  // 防止context上面存在fn属性
  const fn = Symbol("fn");
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
const max = Math.max.call(null, 5, 6, 2, 3, 7);
console.log(max);

var array = ["a", "b"];
array.push.apply(array, 0, 1, 2);
console.info(array);
