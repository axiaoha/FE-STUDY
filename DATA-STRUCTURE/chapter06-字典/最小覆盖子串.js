// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
// 注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// 输入：s = "a", t = "a"
// 输出："a"

// 先找出所有包含T的子串
// 找出长度最小子串，返回即可

// 用双指针维护一个滑动窗口
// 移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串的长度

// 时间复杂度：O(m+n) m是t的长度，n是s的长度
// 空间复杂度： O(m)

var minWindow = function (s, t) {
  let left = 0;
  let right = 0;
  let res = "";
  let need = new Map();
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  let needType = need.size;
  while (right < s.length) {
    const val = s[right];
    if (need.has(val)) {
      need.set(val, need.get(val) - 1);
      if (need.get(val) === 0) needType--;
    }
    while (needType === 0) {
      const val = s[left];
      let newRes = s.substring(left, right + 1);
      if (!res || newRes.length < res.length) res = newRes;
      if (need.has(val)) {
        need.set(val, need.get(val) + 1);
        if (need.get(val) === 1) needType++;
      }
      left++;
    }
    right++;
  }
  return res;
};
console.log(minWindow("ADOBECODEBANC", "ABC"));
console.log(minWindow("AA", "AA"));
