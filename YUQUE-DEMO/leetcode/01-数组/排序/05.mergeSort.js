// 归并排序
// 稳定性：稳定
// 时间复杂度：o(nlogn)
// 最好情况：o(nlogn)
// 最坏情况：o(nlogn)
// 空间复杂度：o(n)
function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

const arr = [3, 44, 38, 5];
console.log(mergeSort(arr));
