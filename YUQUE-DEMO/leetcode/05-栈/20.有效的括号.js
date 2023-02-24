// 给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。
// 1、首先判断该元素是否是 { 、 ( 、 [ ，直接入栈
// 2、否则该字符为 } 、 ) 、 ] 中的一种，如果该字符串有效，则该元素应该与栈顶匹配，例如栈中元素有 ({， 如果继续遍历到的元素为 ),
// 那么当前元素序列为 ({) 是不可能有效的，所以此时与栈顶元素匹配失败，则直接返回 false ，字符串无效。

function isValid(s) {
  let map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}
console.log(isValid("()[]{}"));
