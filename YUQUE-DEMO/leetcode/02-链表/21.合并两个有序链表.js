// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

function mergeTwoLists(link1, link2) {
  let p1 = link1;
  let p2 = link2;
  let res = {
    val: 0,
    next: null,
  };
  let p = res;
  while (p1 && p2) {
    if (p1.val >= p2.val) {
      p.next = p2;
      p2 = p2.next;
    } else {
      p.next = p1;
      p1 = p1.next;
    }
    p = p.next;
  }
  if (p1) {
    p.next = p1;
  }
  if (p2) {
    p.next = p2;
  }
  return res.next;
}
const link1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null,
    },
  },
};
const link2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null,
    },
  },
};
console.log(mergeTwoLists(link1, link2));
