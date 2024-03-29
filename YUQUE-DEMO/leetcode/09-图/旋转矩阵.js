// 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
// 不占用额外内存空间能否做到？

// 给定 matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],

// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]

// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ],

// https://leetcode.cn/problems/rotate-matrix-lcci/solutions/189835/xuan-zhuan-ju-zhen-by-leetcode-solution/
// 如果使用辅助函数：
// 将图像旋转 90 度之后，
// 对于矩阵中第 i 行的第 j 个元素，在旋转后，它出现在倒数第 i 列的第 j 个位置
// 即new_matrix[col][n−row−1] = matrix[row][col]
// 如果使用翻转代替旋转：
// matrix[row][col] 经过对角线翻转得到 matrix[col][row] 经过中线左右翻转得到 matrix[col][n−row−1]
// 和使用辅助函数的关键等式是一致的

// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]

// 按对角线反转后再逐行倒序
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]
// ⬇️
// [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9],
// ]
// ⬇️
// [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3],
// ]

// function rotate(matrix) {
//   const n = matrix.length;
//   //对角线反转 0,0  n-1,n-1
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       swap(matrix, [i, j], [j, i]);
//     }
//   }

//   //中线左右反转
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n / 2; j++) {
//       swap(matrix, [i, j], [i, n - 1 - j]);
//     }
//   }

//   function swap(matrix, [x1, y1], [x2, y2]) {
//     const tmp = matrix[x1][y1];
//     matrix[x1][y1] = matrix[x2][y2];
//     matrix[x2][y2] = tmp;
//   }
// }

function rotate(matrix) {
  const len = matrix.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      swap(matrix, [i, j], [j, i]);
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= Math.floor(len / 2); j++) {
      swap(matrix, [i, j], [i, len - 1 - j]);
    }
  }
  function swap(matrix, [x1, y1], [x2, y2]) {
    const tmp = matrix[x1][y1];
    matrix[x1][y1] = matrix[x2][y2];
    matrix[x2][y2] = tmp;
  }
  return matrix;
}

console.log(
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
