const binaryTree = require("./binaryTree");

// const postorder = (root) => {
//   if (!root) return;
//   postorder(root.left);
//   postorder(root.right);
//   console.log(root.value);
// };

// 非递归版：由于后序遍历的访问顺序是左右根，那么参考先序遍历(根左右)的执行过程，将后序遍历倒过来(先实现根右左的访问顺序，在将结果逆转)就行
const postorder = (root) => {
  if (!root) return;
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const s = stack.pop();
    // console.log(s.value);
    outputStack.unshift(s.value);
    if (s.left) stack.push(s.left);
    if (s.right) stack.push(s.right);
  }
  outputStack.length &&
    outputStack.forEach((item) => {
      console.log(item);
    });
};

postorder(binaryTree);
