Function.prototype.apply = function (context, args) {
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
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max);

var array = ["a", "b"];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array);
