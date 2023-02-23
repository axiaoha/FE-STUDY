// 快指针一次走两步，慢指针一次走一步，当快指针走到终点时，慢指针刚好走到中间
const p1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};

function middleNode(head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

console.log(middleNode(p1));
