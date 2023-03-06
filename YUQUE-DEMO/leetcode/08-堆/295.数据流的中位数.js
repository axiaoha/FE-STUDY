// 最大堆
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // 堆中元素数量
  getSize() {
    return this.heap.length;
  }

  // 插入
  insert(key) {
    this.heap.push(key);
    // 获取存储位置
    let i = this.heap.length - 1;
    while (
      Math.floor((i - 1) / 2) >= 0 &&
      this.heap[i] > this.heap[Math.floor((i - 1) / 2)]
    ) {
      this.swap(i, Math.floor((i - 1) / 2)); // 交换
      i = Math.floor((i - 1) / 2);
    }
  }

  // 删除堆头并返回
  removeHead() {
    if (this.heap.length) {
      if (this.heap.length === 1) return this.heap.pop();
      let num = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapify(0);
      return num;
    }
    return null;
  }

  // 获取堆头
  getHead() {
    return this.heap.length ? this.heap[0] : null;
  }

  // 堆化
  heapify(i) {
    let k = this.heap.length;
    let tmp = this.heap[i];
    for (let j = 2 * i + 1; j < k; j = 2 * j + 1) {
      if (j + 1 < k && arr[j] < arr[j + 1]) {
        j++;
      }
      if (arr[j] > tmp) {
        this.swap(i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

// 最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 堆中元素数量
  getSize() {
    return this.heap.length;
  }

  // 插入
  insert(key) {
    this.heap.push(key);
    // 获取存储位置
    let i = this.heap.length - 1;
    while (
      Math.floor((i - 1) / 2) >= 0 &&
      this.heap[i] < this.heap[Math.floor((i - 1) / 2)]
    ) {
      this.swap(i, Math.floor((i - 1) / 2)); // 交换
      i = Math.floor((i - 1) / 2);
    }
  }

  // 删除堆头并返回
  removeHead() {
    console.log("MinHeap removeHead");
    if (this.heap.length) {
      if (this.heap.length === 1) return this.heap.pop();
      let num = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapify(0);
      return num;
    }
    return null;
  }

  // 获取堆头
  getHead() {
    return this.heap.length ? this.heap[0] : null;
  }

  // 堆化
  heapify(i) {
    let k = this.heap.length;
    let tmp = this.heap[i];
    for (let j = 2 * i + 1; j < k; j = 2 * j + 1) {
      if (j + 1 < k && arr[j] > arr[j + 1]) {
        j++;
      }
      if (arr[j] < tmp) {
        this.swap(i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

class MedianFinder {
  constructor() {
    // 大顶堆，用来保存前 n/2 小的元素
    this.lowHeap = new MaxHeap();
    // 小顶堆，用来保存后 n/2 小的元素
    this.hightHeap = new MinHeap();
  }

  addNum(num) {
    // 如果大顶堆为空或大顶堆堆顶元素小于num，则插入大顶堆
    // 否则插入到小顶堆中
    if (!this.lowHeap.getSize() || num < this.lowHeap.getHead()) {
      // 比大顶堆的堆顶小，插入到大顶堆中
      this.lowHeap.insert(num);
    } else {
      // 比小顶堆的堆顶大，插入到小顶堆中
      this.hightHeap.insert(num);
    }

    // 比较大小顶堆的是否依然保持平衡
    if (this.lowHeap.getSize() - this.hightHeap.getSize() > 1) {
      // 大顶堆往小顶堆迁移
      this.hightHeap.insert(this.lowHeap.removeHead());
    }
    if (this.hightHeap.getSize() > this.lowHeap.getSize()) {
      // 小顶堆向大顶堆迁移
      this.lowHeap.insert(this.hightHeap.removeHead());
    }
  }

  findMedian() {
    if (
      this.lowHeap.getSize() &&
      this.lowHeap.getSize() === this.hightHeap.getSize()
    ) {
      return (this.lowHeap.getHead() + this.hightHeap.getHead()) / 2;
    }
    return this.lowHeap.getHead();
  }
}

const median = new MedianFinder();
median.addNum(1);
console.log("log1", median.lowHeap, median.hightHeap);
median.addNum(2);
console.log("log1", median.lowHeap, median.hightHeap);
console.log(median.findMedian()); // 1.5
median.addNum(3);
console.log("log1", median.lowHeap, median.hightHeap);
console.log(median.findMedian()); // 2
