const graph = require("./graph");

const visited = new Set();
const dfs = (n) => {
  console.log(n);
  visited.add(n);
  graph[n].forEach((g) => {
    if (!visited.has(g)) {
      dfs(g);
    }
  });
};

//2作为根节点开始进行深度优先遍历
dfs(2);
