// https://leetcode-cn.com/problems/reverse-linked-list/
var reverseList = function (head) {
  let pre = head;
  let cur = null;
  while (pre) {
    console.log("pre", pre, "cur", cur);
    const tmp = pre.next;
    pre.next = cur;
    cur = pre;
    pre = tmp;
  }
  return cur;
};
console.log(
  reverseList({
    val: "a",
    next: {
      val: "b",
      next: {
        val: "c",
        next: null,
      },
    },
  })
);

// https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-shuang-zhi-zhen-di-gui-yao-mo-/
