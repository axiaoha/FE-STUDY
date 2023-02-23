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

// function reverseList(head) {
//   // 边界条件：当链表为 null 或链表中仅有一个节点时，不需要反转
//   if (!head || !head.next) return head;
//   let prev = null;
//   let curr = head;
//   while (curr) {
//     let next = curr.next;
//     curr.next = prev;
//     prev = curr;
//     curr = next;
//   }
//   head = prev;
//   return head;
// }

function reverseList(head) {
  if (!head || !head.next) return head;
  head = reverse(null, head);
  return head;
}

function reverse(prev, curr) {
  if (!curr) return prev;
  let next = curr.next;
  curr.next = prev;
  return reverse(curr, next);
}

console.log(reverseList(p1));
