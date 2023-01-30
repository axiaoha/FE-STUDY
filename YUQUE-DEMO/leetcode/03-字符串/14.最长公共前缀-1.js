function longestCommonPrefix(strs) {
  if (strs === null || strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  let min = 0;
  let max = 0;
  for (let i = 0; i < strs.length; i++) {
    if (strs[min] > strs[i]) min = i;
    if (strs[max] < strs[i]) max = i;
  }
  for (let i = 0; i < strs[min].length; i++) {
    if (strs[min][i] !== strs[max][i]) return strs[min].substring(0, i);
  }
  return strs[min];
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
