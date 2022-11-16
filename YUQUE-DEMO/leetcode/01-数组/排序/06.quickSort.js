// 快速排序
// 稳定性：不稳定
// 时间复杂度：o(nlogn)
// 最好情况：o(nlogn)
// 最坏情况：o(n*n)
// 空间复杂度：o(logn)

function quickSort(arr, left, right) {
  let len = arr.length;
  let partitionIndex = 0;
  left = typeof left != "number" ? 0 : left;
  right = typeof right != "number" ? len - 1 : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
// 分区操作
function partition(arr, left, right) {
  let pivot = left;
  let index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}
// 交换数组元素
function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
const arr = [3, 44, 38, 5];
console.log(quickSort(arr));
