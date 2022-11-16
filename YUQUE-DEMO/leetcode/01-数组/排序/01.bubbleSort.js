// 冒泡排序
// 稳定性：稳定
// 时间复杂度：o(n*n)
// 最好情况：o(n) 当输入的数据已经是正序时
// 最坏情况：o(n*n) 当输入的数据是反序时
// 空间复杂度：o(1)
function bubbleSort(arr) {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    let lowPos = arr.length - 1;
    let highPos = 0;
    for (let i = low; i < high; i++) {
      if (arr[i] > arr[i + 1]) {
        highPos = i;
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
      }
    }
    high = highPos;
    console.log("highPos", highPos);
    for (let i = high; i > low; i--) {
      if (arr[i] < arr[i - 1]) {
        lowPos = i - 1;
        let tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
      }
    }
    low = lowPos;
    console.log("lowPos", lowPos);
  }
  return arr;
}
// var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
var arr = [1, 2, 3, 5, 7, 6, 8, 9, 4, 10];
// var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log(bubbleSort(arr));
