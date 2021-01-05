// 给你一个整数数组 nums ，返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。
// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]

// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]

// 用递归模拟出所有的情况
// 保证接的数字都是后面的数字
// 收集所有到达递归终点的情况，并返回
// 有出路，有死路

// 时间复杂度：O(2^n)，因为每个元素都有两种可能(存在或不存在)
// 空间复杂度：O(n) 递归的深度
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];
  const backtrack = (path, len, start) => {
    if (path.length === len) {
      res.push(path);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), len, i + 1);
    }
  };
  for (let i = 0; i < nums.length; i++) {
    backtrack([], i, 0);
  }
};
