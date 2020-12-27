// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
// 说明: 叶子节点是指没有子节点的节点。
// 示例:
// 给定如下二叉树，以及目标和 sum = 22，
//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \      \
//         7    2      1
// 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */

//  思路：
//  在深度优先遍历的过程中，记录当前路径的节点值总和
//  时间复杂度：O(n)
//  空间复杂度：最差的情况(只有左节点或只有右节点)O(n)，最好的情况O(logn)
var hasPathSum = function (root, sum) {
  if (!root) return false;
  let res = false;
  const dfs = (r, s) => {
    if (!r.left && !r.right && s === sum) {
      res = true;
    }
    if (r.left) dfs(r.left, s + r.left.val);
    if (r.right) dfs(r.right, s + r.right.val);
  };
  dfs(root, root.val);
  return res;
};

console.log(
  inorderTraversal(
    {
      val: 5,
      left: {
        val: 4,
        left: {
          val: 11,
          left: {
            val: 7,
          },
          right: {
            val: 2,
          },
        },
      },
      right: {
        val: 8,
        left: {
          val: 13,
          right: {
            val: 1,
          },
        },
        right: {
          val: 4,
        },
      },
    },
    22
  )
);
