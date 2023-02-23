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
function addTwoNumbers(l1, l2) {
  let carry = 0;
  let root = new CreateNode(0);
  let p = root;
  while (l1 || l2) {
    let sum = 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    carry = Math.floor(sum / 10);
    p.next = new CreateNode(sum % 10);
    p = p.next;
  }
  if (carry === 1) {
    p.next = new CreateNode(carry);
  }
  return root.next;
}
// const node1 = new CreateNode(7);
// const node2 = new CreateNode(1);
// const node3 = new CreateNode(6);
// const node4 = new CreateNode(5);
// const node5 = new CreateNode(9);
// const node6 = new CreateNode(2);
const node1 = new CreateNode(0);
const node2 = new CreateNode(0);
const node3 = new CreateNode(5);
const node4 = new CreateNode(0);
const node5 = new CreateNode(0);
const node6 = new CreateNode(5);
const list1 = new CreateList(node1, node2, node3);
const list2 = new CreateList(node4, node5, node6);
console.log(JSON.stringify(addTwoNumbers(list1.head, list2.head)));
