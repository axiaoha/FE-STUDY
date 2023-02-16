function TreeNode(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  let node = new TreeNode(preorder[0]);
  let index = inorder.indexOf(preorder[0]);
  let inLeft = inorder.slice(0, index);
  let inRight = inorder.slice(index + 1);
  let preLeft = preorder.slice(1, index + 1);
  let preRight = preorder.slice(index + 1);
  node.left = buildTree(preLeft, inLeft);
  node.right = buildTree(preRight, inRight);
  return node;
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
// {
//   value: 3,
//   left: { value: 9, left: null, right: null },
//   right: {
//     value: 20,
//     left: { value: 15, left: null, right: null },
//     right: { value: 7, left: null, right: null }
//   }
// }
