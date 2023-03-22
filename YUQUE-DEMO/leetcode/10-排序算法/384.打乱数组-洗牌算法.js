// 打乱一个没有重复元素的数组。

// // 以数字集合 1, 2 和 3 初始化数组。
// int[] nums = {1,2,3};
// Solution solution = new Solution(nums);

// // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
// solution.shuffle();

// // 重设数组到它的初始状态[1,2,3]。
// solution.reset();

// // 随机返回数组[1,2,3]打乱后的结果。
// solution.shuffle();

class Solution {
  constructor(nums) {
    this.nums = nums;
  }
  reset() {
    console.log("reset", this.nums);
    return this.nums;
  }
  shuffle() {
    let res = [...this.nums];
    let n = res.length;
    for (let i = n - 1; i >= 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      this.swap(res, randIndex, i);
    }
    console.log("shuffle", res);
    return res;
  }
  swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

let solution = new Solution([1, 2, 3, 4, 5]);
solution.shuffle();
solution.reset();
solution.shuffle();
