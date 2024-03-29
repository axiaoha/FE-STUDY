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
// 使用 2 个指针：
// fast 快指针提前走 n+1 步
// slow 指针指向当前距离 fast 倒数第 n 个节点， 初始为 head
// 然后， fast 、 slow 同步向前走，直到 fast.next 为 null
// 此时，fast 为最后一个节点，slow 就是倒数第 n+1 个节点，此时问题就变更为删除链表中的 slow 的后继节点
// 但存在一个问题，当链表长度为 n 时，fast 是前进不到 n+1 个节点位置的，所以此时有两种解决思路：
// 1、创建一个头节点 preHead ，设置 preHead.next = head  ，这样就可以解决以上问题，删除倒数第 n 个节点后，返回的 preHead.next 即可
// 2、fast 快指针提前走 n 步后，判断 fast.next 是否为 null ，即 fast 是否是最后一个节点，
// 如果是，则 head 为倒数第 n 个节点，此时问题可以简化为删除头节点；
// 如果不是， fast = fast.next ，fast 再前进一步，slow 为倒数第 n+1 个节点，也解决了以上问题。
function removeNthFromEnd(head, n) {
  let fast = head,
    slow = head;
  while (--n) {
    fast = fast.next;
  }
  if (!fast.next) return fast.next;
  fast = fast.next;
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return head;
}
const res = removeNthFromEnd(p1, 2);
console.log(JSON.stringify(res));
