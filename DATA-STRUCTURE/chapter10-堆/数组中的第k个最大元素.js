// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 示例 1:
// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5
// 示例 2:
// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4

// 思路：
// 构建一个最小堆，并依次把数组的值插入堆中
// 当堆的容量超过k，就删除堆顶
// 插入结束后，堆顶就是第k个最大的元素

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
import MinHeap from "./最小堆类.js";
// 时间复杂度：O(nlogK)
// 空间复杂度：O(k)
var findKthLargest = function (nums, k) {
  const h = new MinHeap();
  nums.forEach((item) => {
    h.insert(item);
    if (h.size() > k) {
      h.pop();
    }
  });
  return h.peek();
};
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
