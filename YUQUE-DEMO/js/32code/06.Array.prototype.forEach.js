Array.prototype.forEach = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const len = this.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};
const array = ["a", "b", "c"];
array.forEach((element) => console.log(element));
