// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]

function topKFrequent(arr, k) {
  let map = new Map(),
    heap = [];

  arr.forEach((item) => {
    if (map.get(item)) map.set(item, map.get(item) + 1);
    else map.set(item, 1);
  });

  if (map.size <= k) return [...map.keys()];

  console.log("topKFrequent", map);

  let i = 0;
  map.forEach((value, key) => {
    if (i < k) {
      heap.push(key);
      if (i === k - 1) buildHeap(heap, map, k);
    } else {
      if (value > map.get(heap[0])) {
        heap[0] = key;
        heapify(heap, map, 0, k);
      }
    }
    i++;
  });

  return heap;
}

function buildHeap(arr, map, k) {
  for (let i = Math.floor((k - 1) / 2); i >= 0; i--) {
    heapify(arr, map, i, k);
  }
}

function heapify(arr, map, i, k) {
  let tmp = arr[i];
  for (let j = 2 * i + 1; j < k; j = 2 * j + 1) {
    if (j + 1 < k && map.get(arr[j]) > map.get(arr[j + 1])) {
      j++;
    }
    if (map.get(arr[j]) < map.get(tmp)) {
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

console.log(topKFrequent([1, 1, 1, 2, 2, 3, 3, 3], 2));
