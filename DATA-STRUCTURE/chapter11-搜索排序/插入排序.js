// 从第二个数开始往前比;
// 比它大就往后排;
// 以此类推进行到最后一个数;

// 时间复杂度：O(n*n)
Object.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    const tmp = this[i];
    let j = i;
    while (j > 0) {
      if (this[j - 1] > tmp) {
        this[j] = this[j - 1];
      } else {
        break;
      }
      j--;
    }
    this[j] = tmp;
  }
  return this;
};
const arr = [5, 4, 3, 2, 1];
console.log(arr.insertionSort());
