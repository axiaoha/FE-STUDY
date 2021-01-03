// 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束
// 如果目标值大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索
// 前提：数组是有序的

// 时间复杂度：O(n)
Array.prototype.binarySearch = function (item) {
  let low = 0;
  let high = this.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (this[mid] > item) {
      high = mid - 1;
    } else if (this[mid] < item) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
const res = [1, 2, 3, 4, 5].binarySearch(0);
console.log(res);
