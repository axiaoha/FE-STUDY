//i(忽略大小写)  m(多行匹配)  g(全局匹配)
//y(粘连修饰符)

// const str = "aaa_aa_a"
// const reg1 = /a+/g //每次匹配剩余的
// const reg2 = /a+/y //剩余的第一个开始匹配
// console.log(reg1.exec(str), reg1.lastIndex); //aaa
// console.log(reg2.exec(str), reg2.lastIndex); //aaa
// console.log(reg1.exec(str), reg1.lastIndex); //aa
// console.log(reg2.exec(str), reg2.lastIndex); //null
// console.log(reg1.exec(str), reg1.lastIndex); //a
// console.log(reg2.exec(str), reg2.lastIndex); //aaa
// y修饰符与g修饰符
// 相同：
// 都是全局匹配， 后一次匹配都是从上一次匹配成功的下一个位置开始
// 不同：
// g修饰符只要在剩余的里面有匹配的就行
// y修饰符是需要剩余的第一个位置开始就能完成匹配， 如果不能完成匹配， 那么又回到最开始的位置进行下一次匹配

// u修饰符 unicode
const str = '\uD842\uDFB7' //表示一个字符
console.log(/^\uD842/.test(str)); //es5 true
console.log(/^\uD842/u.test(str)); //es6 false

// .除了换行符以外的任意单个字符
console.log(/^.$/.test(str)); //false
console.log(/^.$/u.test(str)); //false

console.log(/^\u{61}/.test('a')); //es5 false
console.log(/^\u{61}/u.test('a')); //es6 true

console.log(/𠮷{2}/.test('𠮷𠮷')); //false
console.log(/𠮷{2}/u.test('𠮷𠮷')); //true