// 验证给定的字符串是否可以解释为十进制数字。
// 例如:
// "0" => true
// " 0.1 " => true
// "abc" => false
// "1 a" => false
// "2e10" => true
// " -90e3   " => true
// " 1e" => false
// "e3" => false
// " 6e-1" => true
// " 99e2.5 " => false
// "53.5e93" => true
// " --6 " => false
// "-+3" => false
// "95a54e53" => false
// "+.5e93" => true

// 数字 0-9
// 指数 - "e"
// 正/负号 - "+"/"-"
// 小数点 - "."

// 思路：
// 构建一个表示状态的图
// 遍历字符串，并沿着图走，如果到了某个节点无路可走就返回false
// 遍历结束，如果走到3/5/6，返回true，否则返回false

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, digit: 6 },
    1: { ".": 2, digit: 6 },
    2: { digit: 3 },
    3: { e: 4, digit: 3 },
    4: { sign: 7, digit: 5 },
    5: { digit: 5 },
    6: { e: 4, ".": 3, digit: 6 },
    7: { digit: 5 },
  };
  let state = 0;
  for (let c of s.trim()) {
    if (c >= "0" && c <= "9") {
      c = "digit";
    } else if (c === " ") {
      c = "blank";
    } else if (c === "+" || c === "-") {
      c = "sign";
    }
    state = graph[state][c];
    if (state === undefined) {
      return false;
    }
  }
  if (state === 3 || state === 5 || state === 6) {
    return true;
  }
  return false;
};
