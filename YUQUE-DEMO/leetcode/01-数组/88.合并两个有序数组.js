// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
// 说明:
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。

// 示例:
// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
// 输出: [1,2,2,3,5,6]

// 时间复杂度为 O(m+n)
var merge = function (nums1, m, nums2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;
  // 因为本身就是在往 nums1 中放元素，所以只需考虑 nums2 是否剩元素即可
  while (len2 >= 0) {
    if (len1 < 0) {
      nums1[len--] = nums2[len2--];
    } else {
      nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
    }
  }
};
let nums1 = [1, 2, 3, 0, 0, 0],
  m = 3;
let nums2 = [2, 5, 6],
  n = 3;
merge(nums1, m, nums2, n);
console.log(nums1);
