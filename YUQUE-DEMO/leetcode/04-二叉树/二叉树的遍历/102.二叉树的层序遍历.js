// 逐层地，从左到右访问所有节点
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length) {
    let len = queue.length;
    res.push([]);
    while (len--) {
      const q = queue.shift();
      res[res.length - 1].push(q.val);
      if (q.left) queue.push(q.left);
      if (q.right) queue.push(q.right);
    }
  }
  return res;
};

console.log(
  levelOrder({
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
