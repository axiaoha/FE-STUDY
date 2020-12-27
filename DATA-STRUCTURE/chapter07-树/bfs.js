let tree = {
  value: "a",
  children: [
    {
      value: "b",
      children: [{ value: "d" }, { value: "e" }],
    },
    {
      value: "c",
      children: [{ value: "f" }, { value: "g" }],
    },
  ],
};

function bfs(root) {
  const queue = [root];
  while (queue.length > 0) {
    const q = queue.shift();
    console.log(q.value);
    q.children &&
      q.children.forEach((child) => {
        queue.push(child);
      });
  }
}

bfs(tree);
