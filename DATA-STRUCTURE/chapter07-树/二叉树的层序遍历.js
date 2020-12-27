// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
// 示例：
// 二叉树：[3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层序遍历结果：
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

// 思路：
// 层序遍历顺序就是广度优先遍历
// 在遍历时需要记录当前节点所处的层级，方便将其添加到不同的数组中

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var levelOrder = function (root) {
//   if (!root) return [];
//   let res = [];
//   const queue = [[root, 0]];
//   while (queue.length) {
//     const [q, l] = queue.shift();
//     if (res[l]) {
//       res[l].push(q.val);
//     } else {
//       res[l] = [q.val];
//     }
//     if (q.left) queue.push([q.left, l + 1]);
//     if (q.right) queue.push([q.right, l + 1]);
//   }
//   return res;
// };

//  时间复杂度：O(n)
//  空间复杂度：O(n)
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length > 0) {
    let len = queue.length;
    res.push([]);
    while (len--) {
      // 将同一层的一次性出队
      const q = queue.shift();
      res[res.length - 1].push(q.val);
      if (q.left) queue.push(q.left);
      if (q.right) queue.push(q.right);
    }
  }
  return res;
};

console.log(
  levelOrder({
    val: 3,
    left: {
      val: 9,
    },
    right: {
      val: 20,
      left: {
        val: 15,
      },
      right: {
        val: 7,
      },
    },
  })
);
