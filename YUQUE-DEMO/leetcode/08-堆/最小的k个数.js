// 关于堆：【需要了解堆排序】
// https://github.com/axiaoha/FE-STUDY/blob/feature/DATA-STRUCTURE/chapter10-%E5%A0%86/%E5%A0%86.md

// 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]

// 输入：arr = [0,1,2,1], k = 1
// 输出：[0]

// Top k 问题：简单来说就是在一组数据里面找到频率出现最高的前 k 个数，或前 k 大（当然也可以是前 k 小）的数。

// 构建大顶堆：大顶堆上的任意节点值都必须大于等于其左右子节点值，即堆顶是最大值。
function getLeastNumbers(arr, k) {
  let heap = [];
  for (let i = 0; i < k; i++) {
    heap.push(arr[i]);
  }
  // 构建一个最大堆
  buildHeap(heap, k);
  for (let i = k; i < arr.length; i++) {
    if (arr[i] < heap[0]) {
      heap[0] = arr[i];
      heapify(heap, 0, k);
    }
  }
  return heap;
}

// 原地建堆，从后往前，自上而下式建大顶堆
function buildHeap(arr, k) {
  for (let i = Math.floor((k - 1) / 2); i >= 0; i--) {
    heapify(arr, i, k);
  }
}

// 堆化
// 前提：
// i以下的子堆已经大顶堆
// heapify函数：
// 将 i节点 放置到 i及其子大顶堆构成的堆 中的正确位置，
// 从而使i及其子大顶堆构成的堆成为大顶堆
function heapify(arr, i, k) {
  let tmp = arr[i];
  for (let j = 2 * i + 1; j < k; j = 2 * j + 1) {
    // 选左右节点中比较大的一个节点和父节点做比较
    if (j + 1 < k && arr[j] < arr[j + 1]) {
      j++;
    }
    // 如果子节点比父节点大，则交换父子节点
    if (arr[j] > tmp) {
      swap(arr, i, j);
      i = j;
    } else {
      break;
    }
  }
}

// 交换
function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// 时间复杂度：遍历数组需要 O(n) 的时间复杂度，一次堆化需要 O(logk) 时间复杂度，所以利用堆求 Top k 问题的时间复杂度为 O(nlogk)
// 空间复杂度：O(k)
console.log(getLeastNumbers([8, 4, 5, 6, 7, 8], 4));
