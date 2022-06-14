Array.prototype.filter = function (callback, thisArg) {
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
      if (callback.call(thisArg, this[i], i, this)) {
        res.push(this[i]);
      }
    }
  }
  return res;
};
var filtered = [12, 5, 8, 130, 44].filter((element) => {
  return element >= 10;
});
console.log(filtered);
