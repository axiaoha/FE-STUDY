// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。
// 示例 1：
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6

// 思路：
// 新链表的下一个节点一定是k个链表头中的最小节点;
// 考虑使用最小堆;
// ----------
// 构建一个最小堆，并依次把链表头插入堆中
// 弹出堆顶接到输出链表，并将堆顶所在链表的新链表头插入堆中
// 等堆元素全部弹出，合并工作完成

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
import MinHeap from "./最小堆类.js";
MinHeap.prototype.shiftUp = function (index) {
  if (index === 0) return;
  const parentIndex = this.getParentIndex(index);
  if (
    this.heap[parentIndex] &&
    this.heap[parentIndex].val > this.heap[index].val
  ) {
    this.swap(index, parentIndex);
    this.shiftUp(parentIndex);
  }
};
MinHeap.prototype.shiftDown = function (index) {
  if (index > this.heap.length - 1) return;
  const leftIndex = this.getLeftIndex(index);
  const rightIndex = this.getRightIndex(index);
  if (this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[index].val) {
    this.swap(index, leftIndex);
    this.shiftDown(leftIndex);
  }
  if (
    this.heap[rightIndex] &&
    this.heap[rightIndex].val < this.heap[index].val
  ) {
    this.swap(index, rightIndex);
    this.shiftDown(rightIndex);
  }
};
MinHeap.prototype.pop = function () {
  if (this.size() === 1) return this.heap.shift();
  const top = this.heap[0];
  this.heap[0] = this.heap.pop();
  this.shiftDown(0);
  return top;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// 时间复杂度：O(nlogK)
// 空间复杂度：O(k)
var mergeKLists = function (lists) {
  const res = new ListNode(0);
  let p = res;
  const h = new MinHeap();
  lists.forEach((l) => {
    l && h.insert(l);
  });
  while (h.size()) {
    const n = h.pop();
    p.next = n;
    p = p.next;
    if (n.next) h.insert(n.next);
  }
  return res.next;
};
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
console.log(
  mergeKLists([
    {
      val: 1,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
    {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 4,
          next: null,
        },
      },
    },
    {
      val: 2,
      next: {
        val: 6,
        next: null,
      },
    },
  ])
);
