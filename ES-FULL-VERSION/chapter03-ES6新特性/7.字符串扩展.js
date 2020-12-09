// // 字符的unicode表示法 𠮷 20BB7
// // es6 \uxxxx码点 0000～ffff
// // \u20BB7 -> \u20BB +7(码点超出，会解析错误，解析不出𠮷这个字)
// // \u{20BB7} //加大括号增加码点的取值范围

// console.log('\z' === 'z'); //true
// // 反斜杠后面要是接的三个八进制数就表示一个字符 \HHH
// console.log('\172' === 'z'); //非严格模式下面是true，严格模式下是false
// // \xHH H表示的是16进制的数
// console.log('\x7A' === 'z'); //true
// console.log('\u007A' === 'z'); //true
// console.log('\u{7A}' === 'z'); //true

// // 字符串是可以遍历的
// for (let item of 'axiaoha') {
//     console.log(item);
// }

//模板字符串
// const str1 = `
// <ul>
//   <li>1</li>
//   <li>2</li>
//   <li>3</li>
// </ul>
// `
// console.log(str1);
// const age = 23
// const str2 = `我的年龄是${age}`
// console.log(str2);

// const isLargeScreen = () => {
//     return false
// }
// let class1 = 'icon'
// class1 += isLargeScreen() ? ' icon-big' : ' icon-small'
// console.log(class1);
// const class2 = `icon icon-${isLargeScreen()?'big':'small'}`
// console.log(class2);

// // 带标签的模板字符串
// const foo = (a, b, c, d) => {
//     console.log(a); //["名字：", ",年龄：", "岁",raw: (3) ["名字：", ",年龄：", "岁"]] 里面会有个raw属性叫做原始字符串,不需要被变量替换的内容
//     console.log(b); //axiaoha
//     console.log(c); //23
//     console.log(d); //undefined
// }
// const name = 'axiaoha'
// const age = 23
// foo `名字：${name},年龄：${age}岁`

// String.fromCodePoint()
// String.prototype.includes()
// String.prototype.startsWith()
// String.prototype.endsWith()
// String.prototype.repeat()

console.log(String.fromCharCode(0x20BB7)); //ES5 解析不了
console.log(String.fromCodePoint(0x20BB7)); //ES6 𠮷
const name = 'axiaoha'
console.log(name.indexOf('ha')); //5
console.log(name.includes('ha')); //true
console.log(name.startsWith('axi')); //true
console.log(name.endsWith('ah')); //true
console.log(name.repeat(3)); //重复字符串 axiaohaaxiaohaaxiaoha