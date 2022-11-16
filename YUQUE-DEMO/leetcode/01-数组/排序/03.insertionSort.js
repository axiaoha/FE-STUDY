// 插入排序
// 稳定性：稳定
// 时间复杂度：o(n*n)
// 最好情况：o(n) 输入数组按升序排列
// 最坏情况：o(n*n) 输入数组按降序排列
// 空间复杂度：o(1)
function insertionSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let left = 0;
    let right = i - 1;
    let tmp = arr[i];
    while (left <= right) {
      let mid = parseInt((left + right) / 2);
      if (arr[mid] > tmp) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = tmp;
  }
  return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(insertionSort(arr));
