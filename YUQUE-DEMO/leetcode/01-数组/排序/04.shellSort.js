// 希尔排序（缩小增量排序）
// 稳定性：不稳定
// 时间复杂度：o(n*logn)
// 最好情况：o(n*log2n)
// 最坏情况：o(n*log2n)
// 空间复杂度：o(1)

// 先将整个待排序的记录序列分割成为若干子序列。
// 分别进行直接插入排序。
// 待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。

const shellSort = (arr) => {
  let len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let j = i - gap;
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
      console.log("arr  :", arr);
    }
  }
  return arr;
};

const arr = [35, 33, 42, 10, 14, 19, 27, 44];
console.log(shellSort(arr));
