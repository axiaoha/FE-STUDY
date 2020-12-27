// 给定一个二叉树，找出其最大深度。
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
// 说明: 叶子节点是指没有子节点的节点。
// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

// 思路：
// 求最大深度，考虑使用深度优先遍历
// 在深度优先遍历的过程中，记录每个节点所在的层级，找出最大的层级即可

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

//  时间复杂度：O(n)
//  空间复杂度：最差的情况(只有左节点或只有右节点)O(n)，最好的情况O(logn),函数调用执行堆栈
var maxDepth = function (root) {
  let res = 0;
  const dfs = (r, l) => {
    if (!r) return;
    //当前访问的节点为叶子节点
    if (!r.left && !r.right) {
      res = Math.max(res, l);
    }
    dfs(r.left, l + 1);
    dfs(r.right, l + 1);
  };
  dfs(root, 1);
  return res;
};

console.log(
  maxDepth({
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
