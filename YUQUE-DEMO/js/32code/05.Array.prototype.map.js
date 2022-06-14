Array.prototype.map = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const res = [];
  const len = this.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in this) {
      res.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return res;
};
const array = [1, 4, 9, 16];
const map = array.map((x) => x * 2);
console.log(map);
