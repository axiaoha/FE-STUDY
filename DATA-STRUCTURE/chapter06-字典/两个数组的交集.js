// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]

// 时间复杂度：O(m)+O(n)
// 空间复杂度：O(m)
var intersection = function (nums1, nums2) {
  const map = new Map();
  const res = [];
  nums1.forEach((n) => {
    map.set(n, true);
  });
  nums2.forEach((n) => {
    if (map.get(n)) {
      res.push(n);
      map.delete(n);
    }
  });
  return res;
};
console.log(intersection([1, 2, 2, 1], [2, 2]));
