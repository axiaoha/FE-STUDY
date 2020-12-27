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

function dfs(root) {
  console.log(root.value);
  if (!root.children) return;
  root.children.forEach(dfs);
}

dfs(tree);
