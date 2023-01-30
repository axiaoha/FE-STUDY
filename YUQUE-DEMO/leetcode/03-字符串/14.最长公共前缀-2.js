function longestCommonPrefix(strs) {
  if (strs === null || strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  var trie = new Trie();
  for (let i = 0; i < strs.length; i++) {
    if (!trie.insert(strs[i])) return "";
  }
  return trie.searchLongestPrefix();
}
function Trie() {
  this.root = new TrieNode();
}
function TrieNode() {
  this.next = {};
  this.isEnd = false;
}
Trie.prototype.insert = function (word) {
  if (!word) return false;
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.next[word[i]]) {
      node.next[word[i]] = new TrieNode();
    }
    node = node.next[word[i]];
  }
  node.isEnd = true;
  return true;
};
Trie.prototype.searchLongestPrefix = function () {
  let node = this.root;
  let prevs = "";
  while (node.next) {
    const keys = Object.keys(node.next);
    if (keys.length > 1) break;
    if (node.next[keys[0]].isEnd) {
      prevs += keys[0];
      break;
    }
    prevs += keys[0];
    node = node.next[keys[0]];
  }
  return prevs;
};
console.log(longestCommonPrefix(["fo", "fw"])); // f
// root：
// {
//   root: {
//     next: {
//       f: {
//         next: { o: { next: {}, isEnd: true }, w: { next: {}, isEnd: true } },
//         isEnd: false,
//       },
//     },
//     isEnd: false,
//   },
// }
console.log(longestCommonPrefix(["flo", "flow"])); // flo
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // fl
console.log(longestCommonPrefix(["dog", "racecar", "car"])); //
