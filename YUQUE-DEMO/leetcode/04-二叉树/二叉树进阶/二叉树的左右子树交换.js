// 从根节点开始依次遍历每个节点，然后交换左右子树既可
// function invertTree(root) {
//   if (!root) return null;
//   // 先翻转当前节点的左右子树
//   const temp = root.left;
//   root.left = root.right;
//   root.right = temp;
//   // 然后遍历左子树
//   invertTree(root.left);
//   // 再遍历右子树
//   invertTree(root.right);
//   return root;
// }

function invertTree(root) {
  if (!root) return null;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return root;
}

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
const root = {
  value: 4,
  left: {
    value: 2,
    left: {
      value: 1,
      left: null,
      right: null,
    },
    right: null,
    // {
    //   value: 3,
    //   left: null,
    //   right: null,
    // },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 9,
      left: null,
      right: null,
    },
  },
};
console.log(invertTree(root));
