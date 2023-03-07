// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

// 示例 1：
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

// 示例 2：
// 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]

function queryFn(matrix) {
  if (matrix.length === 0) return [];
  let res = [];
  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1;
  let n = matrix[0].length * matrix.length;
  while (true) {
    if (left > right) break;
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    if (top > bottom) break;
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;
    if (left > right) break;
    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    if (top > bottom) break;
    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
}

console.log(
  queryFn([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ])
);
