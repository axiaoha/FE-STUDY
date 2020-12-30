// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
// 示例 1:
// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]
// 示例 2:
// 输入: nums = [1], k = 1
// 输出: [1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 时间复杂度：O(nlogn)
// var topKFrequent = function (nums, k) {
//   let map = new Map();
//   nums.forEach((n) => {
//     map.set(n, map.has(n) ? map.get(n) + 1 : 1);
//   });
//   let list = Array.from(map).sort((a, b) => b[1] - a[1]);
//   return list.slice(0, k).map((n) => n[0]);
// };

// 时间复杂度：O(nlogK) k<n
// 空间复杂度：O(n)
import MinHeap from "./最小堆类.js";
MinHeap.prototype.shiftUp = function (index) {
  if (index === 0) return;
  const parentIndex = this.getParentIndex(index);
  if (
    this.heap[parentIndex] &&
    this.heap[parentIndex].value > this.heap[index].value
  ) {
    this.swap(index, parentIndex);
    this.shiftUp(parentIndex);
  }
};
MinHeap.prototype.shiftDown = function (index) {
  if (index > this.heap.length - 1) return;
  const leftIndex = this.getLeftIndex(index);
  const rightIndex = this.getRightIndex(index);
  if (
    this.heap[leftIndex] &&
    this.heap[leftIndex].value < this.heap[index].value
  ) {
    this.swap(index, leftIndex);
    this.shiftDown(leftIndex);
  }
  if (
    this.heap[rightIndex] &&
    this.heap[rightIndex].value < this.heap[index].value
  ) {
    this.swap(index, rightIndex);
    this.shiftDown(rightIndex);
  }
};

var topKFrequent = function (nums, k) {
  let map = new Map();
  nums.forEach((n) => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  });
  let h = new MinHeap();
  map.forEach((value, key) => {
    h.insert({ value, key });
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.heap.map((a) => a.key);
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
