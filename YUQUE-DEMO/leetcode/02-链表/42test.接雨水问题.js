// 动态规划
// function trap(height) {
//   let len = height.length;
//   if (!len) return 0;
//   let sum = 0;
//   let max_left = new Array(len).fill(0);
//   let max_right = new Array(len).fill(0);
//   for (let i = 1; i <= len - 1; i++) {
//     max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
//   }
//   for (let i = len - 2; i >= 0; i--) {
//     max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
//   }
//   for (let i = 1; i <= len - 2; i++) {
//     let min = Math.min(max_left[i], max_right[i]);
//     if (min > height[i]) sum = sum + min - height[i];
//   }
//   return sum;
// }

// 双指针
function trap(height) {
  let len = height.length;
  if (!len) return 0;
  let sum = 0;
  let max_left = 0;
  let max_right = 0;
  let left = 1;
  let right = len - 2;
  while (left <= right) {
    if (height[left - 1] < height[right + 1]) {
      max_left = Math.max(height[left - 1], max_left);
      if (max_left > height[left]) sum = sum + max_left - height[left];
      left++;
    } else {
      max_right = Math.max(height[right + 1], max_right);
      if (max_right > height[right]) sum = sum + max_right - height[right];
      right--;
    }
  }
  return sum;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
