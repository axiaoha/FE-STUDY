// //十进制 -> 二进制
// const a = 5
// console.log(a.toString(2)); //101
// //二进制 -> 十进制
// const b = 101
// console.log(parseInt(5.5)); //5
// console.log(parseInt(b, 2)); //5

// //ES5 0B二进制 0O八进制
// const a = 0B0101
// console.log(a); //5
// const b = 0O777
// console.log(b); //511

// console.log(Number.isFinite(5)); //true
// console.log(Number.isFinite(0.5)); //true
// console.log(Number.isFinite(5 / 0)); //false
// console.log(Number.isFinite(Infinity)); //false
// console.log(Number.isFinite('axiaoha')); //false
// console.log(Number.isFinite(true)); //false

// NaN: not a number
// es6逐步把window上面的一些方法移到相应的对象上面去，比如window.isNaN就移动到了Number.isNaN
// 减少了全局性的方法，更具模块化更好理解
console.log(Number.isNaN(NaN)); //true
console.log(Number.isNaN(15)); //false

console.log(Number.parseInt(5.5)); //5
console.log(Number.parseFloat(5.5)); //5.5

console.log(Number.isInteger(5)); //true
console.log(Number.isInteger(5.5)); //false

// 0.1 + 0.2 === 0.3 ? 精度缺失
console.log(0.1 + 0.2 === 0.3); //false
console.log(0.1 + 0.2); //0.30000000000000004

// IEEE754 双精度标准
// 35 -> 00100011
// 0.375 -> 0.011
// 0.1 -> 0.000110011......但是存储空间是有限的，会舍弃超出的部分
console.log(0.1000000000000001) //0.1000000000000001 16位二进制
console.log(0.10000000000000001 === 0.1) //0.1 true

const max = Math.pow(2, 53)
console.log(max);
console.log(Number.MAX_SAFE_INTEGER === max - 1); //true
console.log(Number.MIN_SAFE_INTEGER === -max + 1); //true

console.log(Math.trunc(5.5)); //5
console.log(Math.trunc(-5.5)); //-5
console.log(Math.trunc(true)); //1
console.log(Math.trunc(false)); //0
console.log(Math.trunc(NaN)); //NaN
console.log(Math.trunc(undefined)); //NaN
console.log(Math.trunc()); //NaN

console.log(Number.parseInt(5.5)); //5
console.log(Number.parseInt(-5.5)); //5
console.log(Number.parseInt(true)); //NaN

// Math.sign() 函数返回一个数字的符号, 指示数字是正数，负数还是零
console.log(Math.sign(5)); //1
console.log(Math.sign(-5)); //-1
console.log(Math.sign(0)); //0
console.log(Math.sign(NaN)); //NaN
console.log(Math.sign(true)); //1
console.log(Math.sign(false)); //0

// Math.cbrt 立方根
console.log(Math.cbrt(8)); //2
console.log(Math.cbrt('axiaoha')); //NaN