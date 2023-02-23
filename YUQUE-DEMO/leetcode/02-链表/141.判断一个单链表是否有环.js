const p1 = {
  val: 2,
  next: {
    val: 0,
    next: {
      val: -4,
      next: {
        val: 0,
        next: null,
      },
    },
  },
};
p1.next.next.next = p1;
const link1 = {
  val: 3,
  next: p1,
};

// function hasCycle(head) {
//   while (head) {
//     if (head.flag) return true;
//     head.flag = true;
//     head = head.next;
//   }
//   return false;
// }

// // 利用 JSON.stringify() 不能序列化含有循环引用的结构
// function hasCycle(head) {
//   try {
//     JSON.stringify(head);
//     return false;
//   } catch (err) {
//     return true;
//   }
// }

function hasCycle(head) {
  if (!head || !head.next) {
    return false;
  }
  let fast = head.next.next,
    slow = head.next;
  while (fast !== slow) {
    if (!fast || !fast.next) return false;
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
}

// console.log(link1, p1, hasCycle(link1));
console.log(hasCycle(link1));
