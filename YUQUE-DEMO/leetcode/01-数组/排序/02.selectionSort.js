// 选择排序
// 稳定性：不稳定（例如：5 8 5 2 9，第一遍5和2交互后，破坏了稳定性）
// 时间复杂度：o(n*n)
// 最好情况：o(n*n)
// 最坏情况：o(n*n)
// 空间复杂度：o(1)
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    let tmp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = tmp;
  }
  return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(selectionSort(arr));
