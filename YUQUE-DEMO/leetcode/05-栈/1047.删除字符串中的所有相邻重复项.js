// 输入："abbaca"
// 输出："ca"
// 解释：
// 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

// 遍历字符串，依次入栈，入栈时判断与栈头元素是否一致，如果一致，即这两个元素相同相邻，则需要将栈头元素出栈，并且当前元素也无需入栈
function removeDuplicates(S) {
  let stack = [];
  for (s of S) {
    const prev = stack.pop();
    if (prev !== s) {
      stack.push(prev);
      stack.push(s);
    }
  }
  return stack.join("");
}
console.log(removeDuplicates("abbaca")); // ca
console.log(removeDuplicates("aaa")); // a
