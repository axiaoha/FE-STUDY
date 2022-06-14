Array.prototype.reduce = function (callback, initVal) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  let res = initVal;
  let k = 0;
  const len = this.length >>> 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (res === undefined) {
    while (k < len && !(k in this)) {
      k++;
    }
    // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    res = this[k++];
  }

  for (let i = k; i < len; i++) {
    if (i in this) {
      res = callback(res, this[i], i, this);
    }
  }
  return res;
};

const array = [, 16, , 18, 19];
const res = array.reduce((previous, current, index, array) => {
  const returns = previous + current;
  console.log(
    `previous: ${previous}, current: ${current}, index: ${index}, returns: ${returns}`
  );
  return returns;
});
console.log(res);
