// 03-字符串有这道题

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

function lengthOfLongestSubstring(s) {
  let map = new Map();
  let max = 0;
  for (let i = 0, j = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      j = map.get(s[i]) + 1;
    }
    max = Math.max(max, i - j + 1);
    map.set(s[i], i);
  }
  return max;
}
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
