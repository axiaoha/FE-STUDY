// 示例：
// 输入：
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 输出：
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 时间复杂度：O(n) 每个节点都访问到了
// 空间复杂度：O(h)二叉树的高度，最好的是树节点均匀分布，最差的是树节点单向分布
var invertTree = function (root) {
  if (!root) return null;
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left),
  };
};
console.log(
  invertTree({
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: {
        val: 3,
        left: null,
        right: null,
      },
    },
    right: {
      val: 7,
      left: {
        val: 6,
        left: null,
        right: null,
      },
      right: {
        val: 9,
        left: null,
        right: null,
      },
    },
  })
);
