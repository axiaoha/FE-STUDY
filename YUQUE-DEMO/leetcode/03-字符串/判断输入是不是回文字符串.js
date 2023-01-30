function isPlalindrome(str) {
  if (typeof str !== "string") return false;
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    i++;
    j--;
  }
  return true;
}

console.log(isPlalindrome("abccba"));
console.log(isPlalindrome("abzccba"));
