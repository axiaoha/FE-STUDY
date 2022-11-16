function intersection(...arrs) {
  return [
    ...new Set(
      arrs.reduce((acc, cur) => {
        return cur.filter((item) => acc.includes(item));
      })
    ),
  ];
}
const nums1 = [1, 2, 2, 1, 3];
const nums2 = [2, 2, 3];
const nums3 = [2, 3, 2];
console.log(intersection(nums1, nums2, nums3));
