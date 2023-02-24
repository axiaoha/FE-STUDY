// 输入："abbbaca"
// 输出："ca"
// 解释："abbbaca" => "aaca"=>"ca"

function removeDuplicates(S) {
  let stack = [];
  for (s of S) {
    let prev = stack.pop();
    let top = stack[stack.length - 1];
    if (!prev || prev[0] !== s) {
      if (prev && prev.length < 2) {
        stack.push(prev);
      }
      if (top && top[0] === s) stack[stack.length - 1] += s;
      else stack.push(s);
    } else if (prev[0] === s) stack.push(prev + s);
  }
  return stack.join("");
}
console.log(removeDuplicates("abbbaca")); // ca
console.log(removeDuplicates("abbbacca")); // a
console.log(removeDuplicates("aaaaacca"));

function removeDuplicate(s) {
  let stack = [];
  let top;
  let next;
  let i = 0;
  while (i < s.length) {
    top = stack[stack.length - 1];
    next = s[i];
    if (next === top) {
      stack.pop();
      while (s[i] === top) i++;
    } else {
      stack.push(s[i++]);
    }
  }

  return stack.join(""); // Time: O(n)
}
console.log(removeDuplicate("abbbaca"));
console.log(removeDuplicate("abbbacca"));
console.log(removeDuplicate("aaaaacca"));
