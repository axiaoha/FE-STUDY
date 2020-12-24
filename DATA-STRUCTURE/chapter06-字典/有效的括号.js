// 时间复杂度：O(n)
// 空间复杂度：O(n)
var isValid = function (s) {
  if (s.length % 2) return false;
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");

  for (let i = 0; i < s.length; i++) {
    const t = s[i];
    if (
      map.get(t)
      // t === "(" || t === "{" || t === "["
    ) {
      stack.push(t);
    } else {
      const last = stack[stack.length - 1];
      if (
        map.get(last) === t
        // (last === "(" && t === ")") ||
        // (last === "[" && t === "]") ||
        // (last === "{" && t === "}")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return !stack.length;
};
