// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// 时间复杂度：O(n)
// 空间复杂度：O(n)
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const n = target - val;
    if (map.has(n)) {
      return [map.get(n), i];
    } else {
      map.set(val, i);
    }
  }
};
twoSum([2, 7, 11, 15], 9);
