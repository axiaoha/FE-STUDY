// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
const root = {
  value: 5,
  left: {
    value: 4,
    left: {
      value: 11,
      left: {
        value: 7,
        left: null,
        right: null,
      },
      right: {
        value: 2,
        left: null,
        right: null,
      },
    },
    right: null,
  },
  right: {
    value: 8,
    left: {
      value: 13,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: {
        value: 1,
        left: null,
        right: null,
      },
    },
  },
};
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//   / \      \
//  7   2      1

// way1：【借助前序遍历】，通过数组记录差值
function hasPathSum(root, sum) {
  if (!root) return false;
  const stack = [root];
  const sumStack = [sum];
  while (stack.length > 0) {
    const node = stack.pop();
    const curSum = sumStack.pop();
    if (!node.right && !node.left && curSum === node.value) return true;
    if (node.right) {
      stack.push(node.right);
      sumStack.push(curSum - node.value);
    }
    if (node.left) {
      stack.push(node.left);
      sumStack.push(curSum - node.value);
    }
  }
  return false;
}

// way2：【借助前序遍历】
// 如果当前节点不是叶子节点，递归它的所有子节点，传递的参数就是 sum 减去当前的节点值【叶子节点需要为此值才能返回true】；
// 如果当前节点是叶子节点，判断参数 sum 是否等于当前节点值，如果相等就返回 true，否则返回 false。
// function hasPathSum(root, sum) {
//   if (!root) return false;
//   if (!root.left && !root.right) return sum === root.value;
//   const left = hasPathSum(root.left, sum - root.value);
//   const right = hasPathSum(root.right, sum - root.value);
//   return left || right;
// }

console.log(hasPathSum(root, 22));
