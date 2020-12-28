/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */

//  深度或广度优先遍历所有节点
//  拷贝所有节点，存储起来
//  将拷贝的节点，按照原图的连接方法进行连接

// 时间复杂度：O(n)
// 空间复杂度：O(n)

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

// 深度优先遍历
// var cloneGraph = function (node) {
//   if (!node) return;
//   let visited = new Map();
//   const dfs = (n) => {
//     const nCopy = new Node(n.val);
//     visited.set(n, nCopy);
//     n.neighbors &&
//       n.neighbors.forEach((ne) => {
//         if (!visited.get(ne)) {
//           dfs(ne);
//         }
//         nCopy.neighbors.push(visited.get(ne));
//       });
//   };
//   dfs(node);
//   return visited.get(node);
// };

// 广度优先遍历
// var cloneGraph = function (node) {
//   if (!node) return;
//   const visited = new Map();
//   visited.set(node, new Node(node.val));
//   const queue = [node];
//   while (queue.length) {
//     const q = queue.shift();
//     q.neighbors &&
//       q.neighbors.forEach((ne) => {
//         if (!visited.get(ne)) {
//           queue.push(ne);
//           visited.set(ne, new Node(ne.val));
//         }
//         visited.get(q).neighbors.push(visited.get(ne));
//       });
//   }
//   return visited.get(node);
// };
