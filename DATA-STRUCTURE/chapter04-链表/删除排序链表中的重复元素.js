// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
// 输入: 1->1->2
// 输出: 1->2
// 由于链表是有序的，重复的元素一定是相邻的
// 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素值

// 时间复杂度：O(n)
// 空间复杂度：O(1)
var deleteDuplicates = function (head) {
  let p = head;
  while (p.next) {
    const v1 = p.val;
    const v2 = p.next.val;
    console.log(v1, v2);
    if (v1 === v2) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};

console.log(
  deleteDuplicates({
    val: 1,
    next: {
      val: 1,
      next: {
        val: 1,
        next: {
          val: 2,
          next: {
            val: 3,
            next: null,
          },
        },
      },
    },
  })
);
