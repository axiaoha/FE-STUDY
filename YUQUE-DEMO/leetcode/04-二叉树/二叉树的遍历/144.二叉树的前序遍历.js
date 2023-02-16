// 访问根节点
// 对根节点的左子树进行先序遍历
// 对根节点的右子树进行先序遍历
const binaryTree = require("./binaryTree");

// const preorder = (root) => {
//   if (!root) return;
//   console.log(root.value);
//   preorder(root.left);
//   preorder(root.right);
// };

// 非递归实现版与函数调用堆栈原理有关
const preorder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  while (stack.length) {
    const s = stack.pop();
    console.log(s.value);
    if (s.right) stack.push(s.right);
    if (s.left) stack.push(s.left);
  }
};

preorder(binaryTree);
