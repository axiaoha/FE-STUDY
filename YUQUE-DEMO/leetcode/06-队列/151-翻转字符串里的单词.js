// 03-字符串里面也有这道题

// 给定一个字符串，逐个翻转字符串中的每个单词。
// 输入: "the sky is blue"
// 输出: "blue is sky the"

// 双端队列
function reverseWords(s) {
  let left = 0;
  let right = s.length - 1;
  let queue = [];
  let word = "";
  while (s[left] === " ") left++;
  while (s[right] === " ") right--;
  while (left <= right) {
    let char = s[left];
    if (char === " " && word) {
      queue.unshift(word);
      word = "";
    } else if (char !== "") {
      word += char;
    }
    left++;
  }
  if (word) {
    queue.unshift(word);
  }
  return queue.join(" ");
}
console.log(reverseWords("the sky is blue"));
