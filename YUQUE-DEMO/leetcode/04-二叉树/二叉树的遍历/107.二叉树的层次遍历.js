// 按从叶子节点所在层到根节点所在的层，逐层从左向右遍历
var levelOrderBottom = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length > 0) {
    let len = queue.length;
    res.unshift([]);
    while (len--) {
      // 将同一层的一次性出队
      const q = queue.shift();
      res[0].push(q.val);
      if (q.left) queue.push(q.left);
      if (q.right) queue.push(q.right);
    }
  }
  return res;
};

console.log(
  levelOrderBottom({
    val: 3,
    left: {
      val: 9,
    },
    right: {
      val: 20,
      left: {
        val: 15,
      },
      right: {
        val: 7,
      },
    },
  })
);
