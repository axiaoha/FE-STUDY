function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function sortList(head) {
  return mergeSortRec(head);
}

function mergeSortRec(head) {
  if (!head || !head.next) {
    return head;
  }
  const middle = middleNode(head);
  const right = mergeSortRec(middle.next);
  middle.next = null;
  const left = mergeSortRec(head);
  return mergeTowList(left, right);
}

function middleNode(head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

function mergeTowList(l1, l2) {
  let preHead = new ListNode(-1);
  let cur = preHead;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return preHead.next;
}

console.log(
  sortList({
    val: 5,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 0,
          next: null,
        },
      },
    },
  })
);
