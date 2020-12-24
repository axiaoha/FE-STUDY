// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 思路：
// 用双指针维护一个滑动窗口，用来剪切子串
// 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位
// 过程中，记录所有的窗口的长度，并返回最大值

// 时间复杂度：O(n)
// 空间复杂度：O(m) 字符串中不重复字符串的长度
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let res = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    res = Math.max(res, right - left + 1);
    map.set(s[right], right);
  }
  return res;
};
