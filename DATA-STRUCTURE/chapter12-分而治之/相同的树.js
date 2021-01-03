// 给定两个二叉树，编写一个函数来检验它们是否相同。
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
// 示例 1:
// 输入: 1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]
// 输出: true

// 示例 2:
// 输入:1          1
//           /           \
//          2             2

//         [1,2],     [1,null,2]
// 输出: false

// 示例 3:
// 输入:  1        1
//           / \       / \
//          2   1     1   2

//         [1,2,1],   [1,1,2]
// 输出: false

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 时间复杂度：O(n) 每个节点都访问到了
// 空间复杂度：O(h)二叉树的高度，最好的是树节点均匀分布，最差的是树节点单向分布
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  ) {
    return true;
  }
  return false;
};
console.log(
  isSameTree(
    {
      val: 1,
      left: { val: 2, left: null, right: null },
      left: { val: 1, left: null, right: null },
    },
    {
      val: 1,
      left: { val: 2, left: null, right: null },
      left: { val: 1, left: null, right: null },
    }
  )
);
