// 对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，
// 满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。

// 如果根节点为空或p、q中任一一个节点为根节点，那么根节点为最近公共节点
// 如果根节点不为空或者p、q为非根节点，则递归遍历左右子树，获取左右子树的最近公共祖先
// 1、如果p、q分别存在左右子树中，则最近公共节点为根节点
// 2、如果p、q都存在左子树，则最近公共节点为距离左子树根节点最近的p或者q节点
// 3、如果p、q都存在右子树，则最近公共节点为距离右子树根节点最近的p或者q节点
// 4、如果p、q不存在左右子树，则最近公共节点为null
// 总结：可以把问题转换为判断左右子树是否存在p、q节点，
// 如果p、q节点均存在于左子树或者右子树，则最近公共节点为距离根节点最近的p或者q节点
// 如果p、q分别存在于左子树和右子树，则最近公共节点为根节点
function lowestCommonAncestor(root, p, q) {
  if (root == null || root.value == p || root.value == q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left == null) return right;
  if (right == null) return left;
  return root;
}

const q = {
  value: 4,
  left: null,
  right: null,
};

const p = {
  value: 5,
  left: {
    value: 6,
    left: null,
    right: null,
  },
  right: {
    value: 2,
    left: {
      value: 7,
      left: null,
      right: null,
    },
    right: q,
  },
};

const root = {
  value: 3,
  left: {
    value: 5,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 2,
      left: {
        value: 7,
        left: null,
        right: null,
      },
      right: {
        value: 4,
        left: null,
        right: null,
      },
    },
  },
  right: {
    value: 1,
    left: {
      value: 0,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};
//     3
//    / \
//   5   1
//  / \ / \
//  6 2 0 8
//   / \
//   7 4
console.log(lowestCommonAncestor(root, 5, 8).value); // 3
console.log(lowestCommonAncestor(root, 5, 4).value); // 5
