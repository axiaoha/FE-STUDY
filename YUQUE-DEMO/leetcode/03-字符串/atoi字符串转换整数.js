// function atoi(s) {
//   const number = parseInt(s);

//   if (isNaN(number)) {
//     return 0;
//   } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
//     return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
//   }else{
//     return number
//   }
// }

function atoi(s) {
  let res = 0;
  s = s.trim();
  let match = s.match(/[+|-]?\d*/g)[0];
  if (match === "+" || match === "-" || match === "") {
    return 0;
  }
  res = +match;
  if (res < -(2 ** 31) || res > 2 ** 31 - 1) {
    res = res < -(2 ** 31) ? -(2 ** 31) : 2 ** 31 - 1;
  }
  return res;
}
console.log(atoi("42"));
console.log(atoi("   -42"));
console.log(atoi("4193 with words"));
console.log(atoi("words and 987"));
console.log(atoi("-91283472332"));
