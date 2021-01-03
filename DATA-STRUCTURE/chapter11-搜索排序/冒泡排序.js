// 比较所有相邻元素，如果第一个比第二个大，则交换它们
// 一轮下来，可以保证最后一个数是最大的
// 执行n-1轮，就可以完成排序

// 时间复杂度：O(n*n)
Object.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
      }
    }
  }
  return this;
};
const arr = [5, 4, 3, 2, 1];
console.log(arr.bubbleSort());
