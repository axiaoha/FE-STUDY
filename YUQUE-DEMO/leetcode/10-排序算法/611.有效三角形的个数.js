// 链表那里也有这个
// 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
// 示例 1:
// 输入: [2,2,3,4]
// 输出: 3
// 解释:
// 有效的组合是:
// 2,3,4 (使用第一个 2)
// 2,3,4 (使用第二个 2)
// 2,2,3
// 注意:
// 数组长度不超过1000。
// 数组里整数的范围为 [0, 1000]。

function triangleNumber(nums) {
  if (!nums || nums.length < 3) return 0;
  let count = 0;
  nums.sort((a, b) => a - b);
  for (let k = nums.length - 1; k >= 2; k--) {
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
