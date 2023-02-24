// 输入：s = "deeedbbcccbdaa", k = 3
// 输出："aa"
// 解释：
// 先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
// 再删除 "bbb"，得到 "dddaa"
// 最后删除 "ddd"，得到 "aa"

// 遍历字符串依次入栈，入栈时，判断当前元素与栈头元素是否一致，
// 1、如果不一致则入栈，
// 2、如果一致，判断栈头字符是否长度为 k - 1 ，
//    如果为 k-1 ，即加入该字符时，满足连续相同字符 k 个，此时，需要栈头出栈，当前字符不进栈，
//    如果小于 k-1 ，则取出栈头字符，加上当前字符，重新入栈

function removeDuplicates(S, k) {
  let stack = [];
  for (s of S) {
    let prev = stack.pop();
    if (!prev || prev[0] !== s) {
      stack.push(prev);
      stack.push(s);
    } else if (prev.length < k - 1) {
      stack.push(prev + s);
    }
  }
  return stack.join("");
}
console.log(removeDuplicates("deeedbbcccbdaa", 3));
