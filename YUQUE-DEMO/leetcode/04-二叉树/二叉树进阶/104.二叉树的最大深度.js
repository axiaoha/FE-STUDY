// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// [3,9,20,null,null,15,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7
const root = {
  value: 3,
  left: {
    value: 9,
    left: null,
    right: null,
  },
  right: {
    value: 20,
    left: {
      value: 15,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
};

// function maxDepth(root) {
//   if (!root) return 0;
//   return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
// }

function maxDepth(root) {
  if (!root) return 0;
  const queue = [root];
  let max = 0;
  while (queue.length) {
    max++;
    let len = queue.length;
    while (len--) {
      const q = queue.shift();
      if (q.left) queue.push(q.left);
      if (q.right) queue.push(q.right);
    }
  }
  return max;
}
console.log(maxDepth(root));
