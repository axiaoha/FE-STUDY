// 求最近公共祖先节点，然后再求最近公共祖先节点到两个指定节点的路径，再求两个节点的路径之和
// 【前序遍历】
// 最近公共祖先
function lowestCommonAncestor(root, p, q) {
  if (root === null || root.value == p || root.value == q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left === null) return right;
  if (right === null) return left;
  return root;
}

function getPath(root, p, paths) {
  if (root.value === p) return true;
  paths.push(root.value);
  let hasFound = false;
  if (root.left) hasFound = getPath(root.left, p, paths);
  if (!hasFound && root.right) hasFound = getPath(root.right, p, paths);
  if (!hasFound) paths.pop();
  return hasFound;
}

function shortestDistance(root, p, q) {
  // 最近公共祖先
  let lowestCA = lowestCommonAncestor(root, p, q);
  if (!lowestCA) return Infinity;
  // 分别求出公共祖先到两个节点的路经
  let pDis = [],
    qDis = [];
  getPath(lowestCA, p, pDis);
  getPath(lowestCA, q, qDis);
  console.log("pDis", pDis);
  console.log("qDis", qDis);
  // 返回路径之和
  return pDis.length + qDis.length;
}

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
// console.log(shortestDistance(root, 11, 11));
console.log(shortestDistance(root, 5, 8));
