// 二叉查找树与二叉树不同的是，它在二叉树的基础上，增加了对二叉树上节点存储位置的限制：二叉搜索树上的每个节点都需要满足：
// 1、左子节点值小于该节点值
// 2、右子节点值大于等于该节点值

// 将 insertNode 插入到 node 子树上
function insertNode(node, newNode) {
  if (newNode.key < node.key) {
    // 插入 node 左子树
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else {
    // 插入 node 右子树
    if (node.right === null) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

function searchNode(node, key) {
  if (node === null) return false;
  if (key < node.key) {
    return searchNode(node.left, key);
  } else if (key > node.key) {
    return searchNode(node.right, key);
  } else {
    return true;
  }
}

function removeNode(node, key) {
  if (node === null) return null;
  if (key < node.key) {
    return removeNode(node.left, key);
  } else if (key > node.key) {
    return removeNode(node.right, key);
  } else {
    // key = node.key 删除
    //叶子节点
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // 只有一个子节点
    if (node.left === null) {
      node = node.right;
      return node;
    }
    if (node.right === null) {
      node = node.left;
      return node;
    }
    // 有两个子节点
    // 获取右子树的最小值替换当前节点
    let minRight = findMinNode(node.right);
    node.key = minRight.key;
    node.right = removeNode(node.right, minRight.key);
    return node;
  }
}

// 获取 node 树最小节点
function findMinNode(node) {
  if (node) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }
  return null;
}

function inOrderTraverseNode(node, callback) {
  if (node !== null) {
    // 先遍历左子树
    inOrderTraverseNode(node.left, callback);
    // 然后根节点
    callback(node.key);
    // 再遍历右子树
    inOrderTraverseNode(node.right, callback);
  }
}

// callback 每次将遍历到的结果打印到控制台
function callback(key) {
  console.log(key);
}

function preOrderTraverseNode(node, callback) {
  if (node !== null) {
    // 先根节点
    callback(node.key);
    // 然后遍历左子树
    preOrderTraverseNode(node.left, callback);
    // 再遍历右子树
    preOrderTraverseNode(node.right, callback);
  }
}

function postOrderTraverseNode(node, callback) {
  if (node !== null) {
    // 先遍历左子树
    postOrderTraverseNode(node.left, callback);
    // 然后遍历右子树
    postOrderTraverseNode(node.right, callback);
    // 最后根节点
    callback(node.key);
  }
}

function BinarySearchTree() {
  let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  let root = null;

  // 插入
  this.insert = function (key) {
    // 创建新节点
    let newNode = new Node(key);
    // 判断是否为空树
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  // 查找
  this.search = function (key) {
    return searchNode(root, key);
  };

  // 删除
  this.remove = function (key) {
    root = removeNode(root, key);
  };

  // 最大值：树最右端的节点
  this.max = function () {
    let node = root;
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  // 最小值：树最左端的节点
  this.min = function () {
    let node = root;
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };

  // 中序遍历
  this.inOrderTraverse = function () {
    inOrderTraverseNode(root, callback);
  };

  // 先序遍历
  this.preOrderTraverse = function () {
    preOrderTraverseNode(root, callback);
  };

  // 后序遍历
  this.postOrderTraverse = function () {
    postOrderTraverseNode(root, callback);
  };
}
