function pow(x, y) {
    let res = 1
    for (let i = 0; i < y; i++) {
        res *= x
    }
    return res
}

console.log('pow', pow(8, 3));
console.log(Math.pow(8, 3));
// 幂运算符**中间不能有空格
console.log(8 ** 3);