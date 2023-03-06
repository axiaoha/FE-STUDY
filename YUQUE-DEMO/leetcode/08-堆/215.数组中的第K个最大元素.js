// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5

// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 1, 2, 2, 3, 3, 4, 5, 5, 6;
// 输出: 4

function findKthLargest(arr, k) {
  let heap = [];
  for (let i = 0; i < k; i++) {
    heap.push(arr[i]);
  }
  // 构建一个最小堆
  buildHeap(heap, k);
  for (let i = k; i < arr.length; i++) {
    if (arr[i] > heap[0]) {
      heap[0] = arr[i];
      heapify(heap, 0, k);
    }
  }
  return heap[0];
}

function buildHeap(arr, k) {
  for (let i = Math.floor((k - 1) / 2); i >= 0; i--) {
    heapify(arr, i, k);
  }
}

function heapify(arr, i, k) {
  let tmp = arr[i];
  for (let j = 2 * i + 1; j < k; j = 2 * j + 1) {
    if (j + 1 < k && arr[j] > arr[j + 1]) {
      j++;
    }
    if (arr[j] < tmp) {
      swap(arr, i, j);
      i = j;
    } else {
      break;
    }
  }
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
