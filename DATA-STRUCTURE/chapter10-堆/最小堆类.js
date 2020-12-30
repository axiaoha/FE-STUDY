// 在类里，声明一个数组，用来装元素
// 主要方法：插入、删除栈顶、获取堆顶、获取堆大小

// 插入：
// 将值插入堆的底部，即数组的尾部
// 然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值
// 大小为k的堆中插入元素的时间复杂度为O(logK 堆的高度)

// 删除堆顶：
// 用数组尾部元素替换堆顶（直接删除堆顶会破坏堆结构，虽然最小堆类所有的节点都小于等于它的子节点，但不代表父类那一层的元素都比子类那一层的元素小）
// 然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶
// 大小为k的堆中删除堆顶的时间复杂度为O(logK 堆的高度)

// 获取堆顶、获取堆大小：
// 获取堆顶：返回数组的头部
// 获取堆的大小：返回数组的长度

class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 获取父节点索引
  getParentIndex(index) {
    return (index - 1) >> 1;
  }
  // 获取左节点索引
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  // 获取右节点索引
  getRightIndex(index) {
    return 2 * index + 2;
  }
  // 交换父子节点
  swap(idx1, idx2) {
    const tmp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = tmp;
  }
  // 上移子节点
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }
  // 下移父节点
  shiftDown(index) {
    if (index > this.heap.length - 1) return;
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[index] > this.heap[leftIndex]) {
      this.swap(index, leftIndex);
      this.shiftDown(leftIndex);
    }
    if (this.heap[index] > this.heap[rightIndex]) {
      this.swap(index, rightIndex);
      this.shiftDown(rightIndex);
    }
  }
  // 插入操作
  insert(value) {
    const index = this.heap.push(value) - 1;
    this.shiftUp(index);
  }
  // 移出堆顶
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  // 获取堆顶元素
  peek() {
    return this.heap[0];
  }
  // 获取堆大小
  size() {
    return this.heap.length;
  }
}

// let h = new MinHeap();
// h.insert(3);
// console.log(h.heap);
// h.insert(2);
// console.log(h.heap);
// h.insert(1);
// console.log(h.heap);
// h.pop();
// console.log(h.heap);

export default MinHeap;
