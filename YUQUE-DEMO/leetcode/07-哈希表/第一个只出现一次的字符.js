// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

// s = "abaccdeff"
// 返回 "b"

// s = ""
// 返回 " "

function firstUniqChar(s) {
  if (!s) return " ";
  let map = new Map();
  for (let c of s) {
    if (map.has(c)) map.set(c, map.get(c) + 1);
    else map.set(c, 1);
  }
  console.log("map", map);
  for (let c of map.keys()) {
    if (map.get(c) === 1) return c;
  }
  return " ";
}
console.log(firstUniqChar("apbaccdeff"));
console.log(firstUniqChar(" "));
