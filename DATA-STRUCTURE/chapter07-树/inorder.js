const binaryTree = require("./binaryTree");

// const inorder = (root) => {
//   if (!root) return;
//   inorder(root.left);
//   console.log(root.value);
//   inorder(root.right);
// };

// 非递归实现
const inorder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const s = stack.pop();
    console.log(s.value);
    p = s.right;
  }
};

inorder(binaryTree);
