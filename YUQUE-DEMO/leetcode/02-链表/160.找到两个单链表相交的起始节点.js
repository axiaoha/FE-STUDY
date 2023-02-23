function CreateNode(val) {
  this.val = val;
  this.next = null;
}
function CreateList(...nodes) {
  this.head = nodes[0];
  this.length = nodes.length;
  for (var i = 0; i < nodes.length - 1; i++) {
    if (nodes[i + 1]) {
      nodes[i].next = nodes[i + 1];
    }
  }
}
// function getIntersectionNode(headA, headB) {
//   while (headA) {
//     headA.flag = true;
//     headA = headA.next;
//   }
//   while (headB) {
//     if (headB.flag) return headB;
//     headB = headB.next;
//   }
//   return null;
// }
function getIntersectionNode(headA, headB) {
  // 清除高度差
  let PA = headA,
    PB = headB;
  while (PA && PB) {
    if (PA === PB) return PA;
    PA = !PA.next ? headB : PA.next;
    PB = !PB.next ? headA : PB.next;
  }
  return null;
}
const node1 = new CreateNode(4);
const node2 = new CreateNode(1);
const node3 = new CreateNode(8);
const node4 = new CreateNode(4);
const node5 = new CreateNode(5);
const node6 = new CreateNode(5);
const node7 = new CreateNode(0);
const node8 = new CreateNode(1);
const list1 = new CreateList(node1, node2, node3, node4, node5);
const list2 = new CreateList(node6, node7, node8, node3, node4, node5);
console.log(getIntersectionNode(list1.head, list2.head));
