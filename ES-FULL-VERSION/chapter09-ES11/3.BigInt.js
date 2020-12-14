// 整型的取值范围：
const max = 2 ** 53
console.log(max); //9007199254740992

console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

console.log(max === max - 1); //false
console.log(max === max + 1); //true
console.log(max + 1);

// const bigInt = 9007199254740992n
// console.log(bigInt);
// console.log(typeof bigInt); //bigInt

// console.log(1n == 1); //true
// console.log(1n === 1); //false

// const bigInt2 = BigInt(9007199254740993n)
// console.log(bigInt2);
// console.log(bigInt1 + bigInt2);
// console.log((bigInt1 + bigInt2).toString());