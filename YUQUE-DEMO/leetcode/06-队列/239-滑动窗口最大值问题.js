// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]

// function maxSlidingWindow(nums, k) {
//   if (nums.length === 1) return nums;
//   // 记录结果
//   let res = [];
//   // 记录滑动窗口里面拥有的元素
//   let arr = [];
//   for (let i = 0; i < nums.length; i++) {
//     arr.push(nums[i]);
//     if (i >= k - 1) {
//       res.push(Math.max(...arr));
//       arr.shift();
//     }
//   }
//   return res;
// }

// 双端队列（具有队列和栈性质的抽象数据类型，双端队列中的元素可以从两端弹出，即可以同时从前端和后端添加和移除元素。）
// 使用一个双端队列存储窗口中值的 索引 ，并且保证双端队列中第一个元素永远是最大值，那么只需要遍历一次 nums，就可以取到每次移动时的最大值。
// 比较当前元素 i 和双端队列第一个元素（索引值），相差 >= k 时队首出列
// 依次比较双端队列的队尾与当前元素 i 对应的值，队尾元素值较小时出列，直至不小于当前元素 i 的值时，或者队列为空，这是为了保证当队头出队时，新的队头依旧是最大值
// 当前元素入队
// 从第 K 次遍历开始，依次把最大值（双端队列的队头）添加到结果 result 中
function maxSlidingWindow(nums, k) {
  // 使用一个双端队列存储窗口中值的 索引 ，并且保证双端队列中第一个元素永远是最大值
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // 把滑动窗口之外的踢出
    if (i - deque[0] >= k) {
      deque.shift();
    }
    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    console.log("deque 1:", deque);
    deque.push(i);
    console.log("deque 2:", deque);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}

var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }
  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
    while (q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// console.log(maxSlidingWindow([4, 5, 3, 2], 3));
