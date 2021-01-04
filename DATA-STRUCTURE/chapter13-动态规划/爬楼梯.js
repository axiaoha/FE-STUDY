// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。

// 示例 1：
// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶
// 2.  2 阶

// 示例 2：
// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶

// 定义子问题：F(n)=F(n-1)+F(n-2)
// 反复执行：从2循环到n，执行上述公式
/**
 * @param {number} n
 * @return {number}
 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
var climbStairs = function (n) {
  // if (n === 1) return 1;
  // if (n === 2) return 2;
  // return climbStairs(n - 1) + climbStairs(n - 2);//超时
  if (n < 2) return 1;
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
console.log(climbStairs(3));
