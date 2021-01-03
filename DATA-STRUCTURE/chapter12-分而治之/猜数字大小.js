// 时间复杂度：O(logN)
// 空间复杂度：O(logN)函数调用执行堆栈
function guess(num, random = 6) {
  if (num === random) {
    return 0;
  } else if (num > random) {
    return 1;
  } else {
    return -1;
  }
}
var guessNumber = function (n) {
  const rec = (low, high) => {
    if (low > high) return;
    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
    } else if (res === 1) {
      return rec(mid + 1, high);
    } else {
      return rec(low, mid - 1);
    }
  };
  rec(1, n);
};
console.log(guessNumber(10));
