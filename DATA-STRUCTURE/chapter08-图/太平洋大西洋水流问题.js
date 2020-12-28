// 给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，而“大西洋”处于大陆的右边界和下边界。
// 规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。
// 请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。
// 提示：
// 输出坐标的顺序不重要
// m 和 n 都小于150
// 示例：
// 给定下面的 5x5 矩阵:

//   太平洋 ~   ~   ~   ~   ~
//        ~  1   2   2   3  (5) *
//        ~  3   2   3  (4) (4) *
//        ~  2   4  (5)  3   1  *
//        ~ (6) (7)  1   4   5  *
//        ~ (5)  1   1   2   4  *
//           *   *   *   *   * 大西洋
// 返回:
// [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (上图中带括号的单元).

// 思路：
// 新建两个矩阵，分别记录能流到两个大洋的坐标
// 从海岸线多管齐下，同时深度优先遍历图，过程中填充上述矩阵
// 遍历两个矩阵，找出能流到两个大洋的坐标

// 从海岸线出发，深度遍历矩阵，看能覆盖到哪些符合条件的点(相当于逆流而上)
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

//  时间复杂度：O(m*n)
//  空间复杂度：O(m*n)
var pacificAtlantic = function (matrix) {
  if (!matrix || !matrix[0]) {
    return [];
  }
  let res = [];
  const m = matrix.length; //行数
  const n = matrix[0].length; //列数
  const flow1 = Array.from({ length: m }, () => new Array(n).fill(false));
  const flow2 = Array.from({ length: m }, () => new Array(n).fill(false));
  const dfs = (r, c, flow) => {
    flow[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([row, col]) => {
      if (
        // 在矩阵里面
        row >= 0 &&
        row < m &&
        col >= 0 &&
        col < n &&
        // 没有被访问过
        !flow[row][col] &&
        // 逆流而上
        matrix[row][col] >= matrix[r][c]
      ) {
        dfs(row, col, flow);
      }
    });
  };
  for (let r = 0; r < m; r += 1) {
    dfs(r, 0, flow1);
    dfs(r, n - 1, flow2);
  }
  for (let c = 0; c < n; c += 1) {
    dfs(0, c, flow1);
    dfs(m - 1, c, flow2);
  }
  for (let r = 0; r < m; r += 1) {
    for (let c = 0; c < n; c += 1) {
      if (flow1[r][c] && flow2[r][c]) {
        res.push([r, c]);
      }
    }
  }
  return res;
};
pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);
