// 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，
// 且元素按顺时针顺序螺旋排列的正方形矩阵。

// 输入: 3
// 输出:
// [
//  [ 1, 2, 3 ],
//  [ 8, 9, 4 ],
//  [ 7, 6, 5 ]
// ]

// function generateMatrix(n) {
//   // 定义一个二维数组进行数据保存
//   const result = [];
//   for (let i = 0; i < n; i++) {
//     result.push(new Array(n));
//   }
//   let left = 0;
//   let right = n - 1;
//   let top = 0;
//   let bottom = n - 1;
//   let current = 1,
//     max = n * n;
//   while (current <= max) {
//     // 上面从左到右
//     for (let i = left; i <= right; i++) {
//       result[top][i] = current++;
//     }
//     top++;
//     // 右边从上到下
//     for (let i = top; i <= bottom; i++) {
//       result[i][right] = current++;
//     }
//     right--;
//     // 下边从右到左
//     for (let i = right; i >= left; i--) {
//       result[bottom][i] = current++;
//     }
//     bottom--;
//     // 左边从下到上
//     for (let i = bottom; i >= top; i--) {
//       result[i][left] = current++;
//     }
//     left++;
//   }
//   return result;
// }

function generateMatrix(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(new Array(n));
  }
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1,
    current = 1,
    max = n * n;
  while (current <= max) {
    for (let i = left; i <= right; i++) {
      result[top][i] = current++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      result[i][right] = current++;
    }
    right--;
    for (let i = right; i >= left; i--) {
      result[bottom][i] = current++;
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      result[i][left] = current++;
    }
    left++;
  }
  return result;
}

console.log(generateMatrix(3));
