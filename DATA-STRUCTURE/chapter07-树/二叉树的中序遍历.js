// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
// 示例 1：
// 输入：root = [1,null,2,3]
// 输出：[1,3,2]

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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  if (!root) return [];
  const stack = [];
  const res = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const s = stack.pop();
    res.push(s.val);
    p = s.right;
  }
  return res;
};

console.log(
  inorderTraversal({
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
