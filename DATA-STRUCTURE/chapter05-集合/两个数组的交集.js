// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]

// 时间复杂度：O(m*n)
// 空间复杂度：O(m)
var intersection = function (nums1, nums2) {
  // return [...new Set(nums1)].filter((item) => new Set(nums2).has(item));
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
};
console.log(intersection([1, 2, 2, 1], [2, 2]));
