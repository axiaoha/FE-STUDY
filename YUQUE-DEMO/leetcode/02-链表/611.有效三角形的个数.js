// 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。

// 先数组排序，排序完后，固定最长的边，利用双指针法判断其余边
// 以 nums[nums.length - 1] 作为最长的边 nums[k] （ k = nums.length - 1 ）
// 以 nums[i] 作为最短边，以 nums[nums.length - 2] 作为第二个数 nums[j] （ j = nums.length - 2 ） ，
// 判断 nums[i] + nums[j] 是否大于 nums[k] ，
// 1、
// nums[i] + nums[j] > nums[k] ，则：
// nums[i+1] + nums[j] > nums[k]
// nums[i+2] + nums[j] > nums[k]
// ...
// nums[j-1] + nums[j] > nums[k]
// 则可构成三角形的三元组个数加 j-i ，并且 j 往前移动一位（ j-- ）， 继续进入下一轮判断
// 2、
// nums[i] + nums[j] <= nums[k]，则 l 往后移动一位（nums 是增序排列），继续判断

function triangleNumber(nums) {
  if (!nums || nums.length < 3) return 0;
  let count = 0;
  nums.sort((a, b) => a - b);
  for (let k = nums.length - 1; k > 1; k--) {
    let i = 0;
    let j = k - 1;
    while (i < j) {
      if (nums[i] + nums[j] > nums[k]) {
        count += j - i;
        j--;
      } else {
        i++;
      }
    }
  }
  return count;
}
console.log(triangleNumber([2, 2, 3, 4]));
