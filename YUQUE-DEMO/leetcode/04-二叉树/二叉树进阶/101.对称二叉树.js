// 给定一个二叉树，检查它是否是镜像对称的。

const root1 = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
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
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
};
const root2 = {
  value: 1,
  left: {
    value: 2,
    left: null,
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
  right: {
    value: 2,
    left: null,
    right: {
      value: 3,
      left: null,
      right: null,
    },
  },
};

// 递归
// function isSymmetric(root) {
//   if (!root) return true;
//   function isEqual(left, right) {
//     if (!left && !right) return true;
//     if (!left || !right) return false;
//     return (
//       left.value === right.value &&
//       isEqual(left.left, right.right) &&
//       isEqual(left.right, right.left)
//     );
//   }
//   return isEqual(root.left, root.right);
// }

// 迭代
function isSymmetric(root) {
  if (!root) return;
  const stack = [root.left, root.right];
  while (stack.length > 0) {
    const right = stack.pop();
    const left = stack.pop();
    if (left && right) {
      if (left.value !== right.value) return false;
      stack.push(left.left);
      stack.push(right.right);
      stack.push(left.right);
      stack.push(right.left);
    } else if (left || right) {
      return false;
    }
  }
  return true;
}

console.log(isSymmetric(root1));
console.log(isSymmetric(root2));
