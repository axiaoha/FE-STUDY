// 快速排序
// 稳定性：不稳定
// 时间复杂度：o(nlogn)
// 最好情况：o(nlogn) 【每次确定的元素位置都是中间那个数，只有left以最快的速度与right的值保持一致才是最快速的排序（所有分区都只有一个元素的时候才不会继续进行排序）】
// 最坏情况：o(n*n) 【已经是一个按顺序排好的数组】
// 空间复杂度：o(logn)
// 以2为底N的对数

function quickSort(arr, left, right) {
  let len = arr.length;
  let partitionIndex = 0;
  left = typeof left !== "number" ? 0 : left;
  right = typeof right !== "number" ? len - 1 : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
function partition(arr, left, right) {
  let pivot = left;
  let index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, index, i);
      index++;
    }
  }
  swap(arr, index - 1, left);
  return index - 1;
}
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
console.log(quickSort([3, 44, 38, 5]));
