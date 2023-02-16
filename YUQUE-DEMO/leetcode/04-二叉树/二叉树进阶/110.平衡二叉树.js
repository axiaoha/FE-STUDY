// 给定一个二叉树，判断它是否是高度平衡的二叉树【一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1】。

// 利用后续遍历二叉树（左右根），从底至顶返回子树最大高度，判定每个子树是不是平衡树 ，
// 如果平衡，则使用它们的高度判断父节点是否平衡，并计算父节点的高度，如果不平衡，返回 -1 。

// 比较左右子树的深度，若差值大于 1 则返回一个标记 -1 ，表示当前子树不平衡
// 左右子树有一个不是平衡的，或左右子树差值大于 1 ，则二叉树不平衡
// 若左右子树平衡，返回当前树的深度（左右子树的深度最大值 +1 ）

const root1 = {
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
//     3
//    / \
//   9   20
//       / \
//      15  7

const root2 = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
      left: {
        value: 4,
        left: null,
        right: null,
      },
      right: {
        value: 4,
        left: null,
        right: null,
      },
    },
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
  right: {
    value: 2,
    left: null,
    right: null,
  },
};
//     1
//    / \
//   2   2
//  / \
//  3 3
// / \
// 4 4

function isBalanced(root) {
  return balanced(root) !== -1;
}

function balanced(node) {
  if (!node) return 0;
  const left = balanced(node.left);
  const right = balanced(node.right);
  // console.log("balanced", node.value, left, right);
  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }
  return Math.max(left, right) + 1;
}
console.log(isBalanced(root1));
console.log(isBalanced(root2));
