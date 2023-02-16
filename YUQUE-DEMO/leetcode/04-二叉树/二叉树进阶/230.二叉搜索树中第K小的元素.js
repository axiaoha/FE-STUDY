// 输入: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 1

// 对二叉搜索树进行中序遍历即会将二叉树节点从小到大排序

// function kthSmallest(root, k) {
//   let res = null;
//   let inOrderTraverseNode = function (node) {
//     if (node !== null && k > 0) {
//       // 先遍历左子树
//       inOrderTraverseNode(node.left);
//       // 然后根节点
//       if (--k === 0) {
//         res = node.val;
//         return;
//       }
//       // 再遍历右子树
//       inOrderTraverseNode(node.right);
//     }
//   };
//   inOrderTraverseNode(root);
//   return res;
// }

function kthSmallest(root, k) {
  let stack = [];
  let node = root;

  while (node || stack.length) {
    // 遍历左子树
    while (node) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    if (--k === 0) {
      return node.val;
    }
    node = node.right;
  }
  return null;
}

const root2 = {
  value: 3,
  left: {
    value: 1,
    left: null,
    right: {
      value: 2,
      left: null,
      right: null,
    },
  },
  right: {
    value: 4,
    left: null,
    right: null,
  },
};
//    3
//   / \
//  1   4
//   \
//    2
