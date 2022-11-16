// 堆排序
// 稳定性：不稳定
// 时间复杂度：o(n*logn)
// 最好情况：o(n*logn)
// 最坏情况：o(n*logn)
// 空间复杂度：o(1)

// 左子节点=2*父节点的下标+1
// 右子节点=2*父节点的下标+2
// 第k层的最后一个节点下标为：2^k - 1 - 1
// 第k层的第1个节点下标为：2^(k - 1) - 1
// 第1个非叶子节点下标为：Math.floor(总节点数 / 2 - 1)

function heapSort(arr) {
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  // 排序，每次都找出当前的最大值
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i);
  }
  return arr;
}

// 交换两个节点
function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// 前提：
// i以下的子堆已经大顶堆
// heapify函数：
// 将 i节点 放置到 i及其子大顶堆构成的堆 中的正确位置，
// 从而使i及其子大顶堆构成的堆成为大顶堆
function heapify(arr, i, length) {
  let tmp = arr[i];
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    if (j + 1 < length && arr[j] < arr[j + 1]) {
      j++;
    }
    if (arr[j] > tmp) {
      swap(arr, i, j);
      i = j;
    } else {
      break;
    }
  }
}

const arr = [3, 44, 38, 5];
console.log(heapSort(arr));
