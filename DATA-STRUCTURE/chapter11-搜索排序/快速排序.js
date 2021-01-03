// 思路：
// 分区：从数组中任意选择一个基准，所有比基准小的元素放在基准前面，比基准大的元素放在基准后面
// 递归：递归地对基准前后的子数组进行分区

// 时间复杂度：O(nlogN)
Object.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length === 1 || arr.length === 0) return arr;
    const left = [];
    const right = [];
    const mid = arr[0];
    // 分区
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };
  const res = rec(this);
  // 拷贝
  res.forEach((item, index) => {
    this[index] = item;
  });
  return this;
};
const arr = [5, 4, 3, 2, 1];
console.log(arr.quickSort());
