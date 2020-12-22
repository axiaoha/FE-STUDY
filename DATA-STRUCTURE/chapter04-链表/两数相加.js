// https://leetcode-cn.com/problems/add-two-numbers/
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

// 空间复杂度：O(n)
// 时间复杂度：O(n)
var addTwoNumbers = function (l1, l2) {
  const l3 = { val: 0, next: null };
  let p3 = l3;
  let carry = 0;
  while (l1 || l2) {
    const v1 = l1 ? l1.val : 0;
    const v2 = l2 ? l2.val : 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    // 操作当前节点
    p3.next = { val: val % 10, next: null };
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
    // 更换p3指针，操作下一个节点的内容
    p3 = p3.next;
  }
  if (carry) {
    p3.next = { val: carry, next: null };
  }
  return l3.next;
};

console.log(
  addTwoNumbers(
    {
      val: 2,
      next: {
        val: 4,
        next: {
          val: 3,
          next: null,
        },
      },
    },
    {
      val: 5,
      next: {
        val: 6,
        next: {
          val: 4,
          next: null,
        },
      },
    }
  )
);
