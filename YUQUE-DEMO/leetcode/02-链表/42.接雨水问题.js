// https://leetcode.cn/problems/trapping-rain-water/solutions/9112/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/

function CreateNode(val) {
  this.val = val;
  this.next = null;
}
function CreateList(...nodes) {
  this.head = nodes[0];
  this.length = nodes.length;
  for (var i = 0; i < nodes.length - 1; i++) {
    if (nodes[i + 1]) {
      nodes[i].next = nodes[i + 1];
    }
  }
}
// // 动态规划
// function trap(height) {
//   const n = height.length;
//   if (n == 0) {
//     return 0;
//   }

//   let sum = 0;
//   const max_left = new Array(n).fill(0);
//   const max_right = new Array(n).fill(0);

//   for (let i = 1; i <= height.length - 1; i++) {
//     max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
//   }
//   for (let i = height.length - 2; i >= 0; i--) {
//     max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
//   }
//   for (let i = 1; i < height.length - 1; i++) {
//     let min = Math.min(max_left[i], max_right[i]);
//     if (min > height[i]) {
//       sum = sum + (min - height[i]);
//     }
//   }
//   return sum;
// }

// 双指针:
// 假设一开始left-1大于right+1，则之后right会一直向左移动，直到right+1大于left-1。
// 在这段时间内right所遍历的所有点都是左侧最高点maxleft大于右侧最高点maxright的，
// 所以只需要根据原则判断maxright与当前高度的关系就行。反之left右移，所经过的点只要判断maxleft与当前高度的关系就行。
function trap(height) {
  let sum = 0;
  // max_left 表示 left 的左边最高的柱子长度（不包括 left）
  let max_left = 0;
  // max_right 表示 right 的右边最高的柱子长度（不包括 right）
  let max_right = 0;
  // left 表示左边当前遍历的柱子（即左边我们需要计算能够装多少水的柱子）
  let left = 1;
  // right 表示右边当前遍历的柱子
  let right = height.length - 2; // 加右指针进去
  while (left <= right) {
    //从左到右更
    // 能够说明左侧最高点maxleft小于右侧最高点maxright
    if (height[left - 1] < height[right + 1]) {
      max_left = Math.max(max_left, height[left - 1]);
      let min = max_left;
      if (min > height[left]) {
        sum = sum + (min - height[left]);
      }
      left++;
      //从右到左更
    } else {
      max_right = Math.max(max_right, height[right + 1]);
      let min = max_right;
      if (min > height[right]) {
        sum = sum + (min - height[right]);
      }
      right--;
    }
  }
  return sum;
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
