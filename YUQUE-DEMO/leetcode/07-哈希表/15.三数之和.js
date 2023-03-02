function threeSum(nums) {
  if (!nums || nums.length < 3) return [];
  let result = [],
    left,
    right;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    left = i + 1;
    right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (!sum) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
        left++;
        right--;
      } else if (sum < 0) left++;
      else if (sum > 0) right--;
    }
  }
  return result;
}
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
