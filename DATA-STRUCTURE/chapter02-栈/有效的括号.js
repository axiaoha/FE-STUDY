// 新建一个栈
// 扫描字符串，遇左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定为不合法。
// 最后栈空即合法，否则不合法
// 优化：
// 如果数组的长度是奇数则为false

// 解法1:
// 时间复杂度：O(n)
// 空间复杂度：O(n)
var isValid = function (s) {
  if (s.length % 2) return false;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const t = s[i];
    if (t === "(" || t === "{" || t === "[") {
      stack.push(t);
    } else {
      const last = stack[stack.length - 1];
      if (
        (last === "(" && t === ")") ||
        (last === "[" && t === "]") ||
        (last === "{" && t === "}")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return !stack.length;
};
