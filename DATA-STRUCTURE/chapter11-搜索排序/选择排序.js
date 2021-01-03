// 找到数组中的最小值，选中它并将其放置在第一位
// 接着找到第二小的值，选中它并将其放置在第二位
// 以此类推，执行n-1轮

// 时间复杂度：O(n*n)
Object.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let idxMin = i;
    for (let j = i; j < this.length; j++) {
      if (this[idxMin] > this[j]) {
        idxMin = j;
      }
    }
    const tmp = this[i];
    this[i] = this[idxMin];
    this[idxMin] = tmp;
  }
  return this;
};
const arr = [5, 4, 3, 2, 1];
console.log(arr.selectionSort());
