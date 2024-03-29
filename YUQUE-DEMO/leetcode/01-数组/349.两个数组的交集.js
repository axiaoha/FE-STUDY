// 给定两个数组，编写一个函数来计算它们的交集。
// 说明:
// 输出结果中的每个元素一定是唯一的。
// 我们可以不考虑输出结果的顺序。
// 示例 1:
// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2]
// 示例 2:
// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [9,4]

function intersection(arr1, arr2) {
  const map1 = {};
  const map2 = {};
  const result = [];
  arr1.forEach((item) => {
    map1[item] = true;
  });
  arr2.forEach((item) => {
    if (map1[item] && !map2[item]) {
      result.push(item);
      map2[item] = true;
    }
  });
  return result;
}
const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
console.log(intersection(nums1, nums2));
