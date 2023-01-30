// function lengthOfLongestSubstring(s) {
//   let arr = [],
//     max = 0;
//   for (let i = 0; i < s.length; i++) {
//     let index = arr.indexOf(s[i]);
//     if (index !== -1) {
//       arr.splice(0, index + 1);
//     }
//     arr.push(s[i]);
//     max = Math.max(arr.length, max);
//   }
//   return max;
// }

function lengthOfLongestSubstring(s) {
  let map = new Map(),
    max = 0;
  // i 来标记无重复子串开始下标，j 为当前遍历字符下标
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = map.get(s[j]) + 1;
    }
    max = Math.max(j - i + 1, max);
    map.set(s[j], j);
  }
  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
