function addStrings(num1, num2) {
  let a = num1.length,
    b = num2.length,
    tmp = 0,
    result = "";
  while (a || b) {
    // const a = "123455"[0];
    // typeof a; //'string'
    // typeof +a; //'number'
    if (a) {
      tmp += +num1[--a];
    }
    if (b) {
      tmp += +num2[--b];
    }
    result = (tmp % 10) + result;
    if (tmp > 9) tmp = 1;
    else tmp = 0;
  }
  if (tmp) {
    result = 1 + result;
  }
  return result;
}
console.log(addStrings("111", "222222222"));
