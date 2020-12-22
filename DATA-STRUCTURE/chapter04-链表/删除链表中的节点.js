//https://leetcode-cn.com/problems/delete-node-in-a-linked-list/
// 由于只给出删除节点的信息，而链表里面的元素都是指向下一个元素的，因此无法直接获取被删除节点的上一个节点信息
// 思路：用被删除的节点代替下个节点，然后再删除下一个节点

// 时间复杂度：O(1)
// 空间复杂度：O(1)

var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
  return node;
};
console.log(
  deleteNode({
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

// var deleteNode = function (node) {
//   Object.assign(node, node.next);
// };

// 题解参考：
// https://leetcode-cn.com/problems/delete-node-in-a-linked-list/solution/jsxiao-keng-by-chitanda-eru/
// https://leetcode-cn.com/problems/delete-node-in-a-linked-list/solution/73-shan-chu-lie-biao-zhong-de-jie-dian-by-joeyzhou/
