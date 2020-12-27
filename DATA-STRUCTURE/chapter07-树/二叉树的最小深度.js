// 给定一个二叉树，找出其最小深度。
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// 说明：叶子节点是指没有子节点的节点。
// 示例 1：
// 输入：root = [3,9,20,null,null,15,7]
// 输出：2

// 示例 2：
// 输入：root = [2,null,3,null,4,null,5,null,6]
// 输出：5

// 解题思路
// 求最小深度，使用广度优先遍历
// 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级

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
//  空间复杂度：O(n)
var minDepth = function (root) {
  if (!root) return 0;
  let res = 0;
  const queue = [[root, 1]];
  while (queue.length) {
    let [q, l] = queue.shift();
    if (!q.left && !q.right) {
      return l;
    }
    l++;
    if (q.left) queue.push([q.left, l]);
    if (q.right) queue.push([q.right, l]);
  }
  return res;
};

console.log(
  minDepth({
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

console.log(
  minDepth({
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4,
      },
      right: {
        val: 5,
      },
    },
    right: {
      val: 3,
    },
  })
);

console.log(
  minDepth({
    val: 2,
    right: {
      val: 3,
      right: {
        val: 4,
        right: {
          val: 5,
          right: {
            val: 6,
          },
        },
      },
    },
  })
);
