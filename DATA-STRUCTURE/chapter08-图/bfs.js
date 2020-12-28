const graph = require("./graph");

const visited = new Set();
visited.add(2);
const queue = [2];
while (queue.length) {
  const q = queue.shift();
  console.log(q);
  graph[q].forEach((g) => {
    if (!visited.has(g)) {
      queue.push(g);
      visited.add(g);
    }
  });
}
