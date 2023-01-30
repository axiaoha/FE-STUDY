// function multiply(num1, num2) {
//   if (num1 === "0" || num2 === "0") return "0";

//   // 用于保存计算结果
//   let res = "0";

//   // num2 逐位与 num1 相乘
//   for (let i = num2.length - 1; i >= 0; i--) {
//     let carry = 0;
//     // 保存 num2 第i位数字与 num1 相乘的结果
//     let temp = "";
//     // 补 0
//     for (let j = 0; j < num2.length - 1 - i; j++) {
//       temp += "0";
//     }
//     let n2 = +num2[i];

//     // num2 的第 i 位数字 n2 与 num1 相乘
//     for (let j = num1.length - 1; j >= 0 || carry != 0; j--) {
//       let n1 = j < 0 ? 0 : +num1[j];
//       let product = (n1 * n2 + carry) % 10;
//       temp = product + temp;
//       carry = Math.floor((n1 * n2 + carry) / 10);
//     }
//     // 将当前结果与新计算的结果求和作为新的结果
//     res = addStrings(res, temp);
//   }
//   return res;
// }

// function addStrings(num1, num2) {
//   let a = num1.length,
//     b = num2.length,
//     result = "",
//     tmp = 0;
//   while (a || b) {
//     a ? (tmp += +num1[--a]) : "";
//     b ? (tmp += +num2[--b]) : "";

//     result = (tmp % 10) + result;
//     if (tmp > 9) tmp = 1;
//     else tmp = 0;
//   }
//   if (tmp) result = 1 + result;
//   return result;
// }

function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  // 用于保存计算结果
  let res = [];

  // 从个位数开始逐位相乘
  for (let i = num1.length - 1; i >= 0; i--) {
    // num1 尾元素
    let tmp1 = +num1[i];

    for (let j = num2.length - 1; j >= 0; j--) {
      // num2尾元素
      let tmp2 = +num2[j];

      // 判断结果集索引位置是否有值
      let pos = res[i + j + 1] ? res[i + j + 1] + tmp1 * tmp2 : tmp1 * tmp2;
      // 赋值给当前索引位置
      res[i + j + 1] = pos % 10;
      // 是否进位 这样简化res去除不必要的"0"
      pos >= 10 &&
        (res[i + j] = res[i + j]
          ? res[i + j] + Math.floor(pos / 10)
          : Math.floor(pos / 10));
    }
  }
  return res.join("");
}

console.log(multiply("123", "456"));
