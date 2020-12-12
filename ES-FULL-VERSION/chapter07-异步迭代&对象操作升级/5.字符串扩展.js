// 放松了模板字符串转义序列的语法限制
// const foo = function(a, b, c, d) {
//     console.log(a);
//     console.log(b);
//     console.log(c);
//     console.log(d);
// }
// const name = 'axiaoha'
// const age = 23
// foo `这是${name},她的年龄是${age}岁`

const foo = arg => {
    console.log(arg); //undefined
}
foo `\u{61} and \unicode`

// let str = `\u{61} and \unicode` //报错：Invalid Unicode escape sequence，说明只是扩展了带标签的模板字符串