// 全局模式捕获：String.prototype.matchAll()
const str = `
  <html>
    <body>
      <div>第一个div</div>
      <p>这是一个p</p>
      <span>span</span>
      <div>第二个div</div>
    <body>
  </html>
`

// function selectDiv(regExp, str) {
//     let matches = []
//     while (true) {
//         console.log(regExp.lastIndex);
//         const match = regExp.exec(str)
//         console.log(match);
//         if (match === null) {
//             break
//         }
//         matches.push(match[1])
//     }
//     return matches
// }
const regExp = /<div>(.*)<\/div>/g //一定要使用全局匹配模式，不然会陷入死循环
    // const res = selectDiv(regExp, str)
    // console.log(res);

// //match
// console.log(str.match(regExp));

// //replace
// function selectDiv2(regExp, str) {
//     let matches = []

//     // 和exec的返回值有点像
//     str.replace(regExp, (all, first) => {
//         console.log(all, first);
//         matches.push(first)
//     })
//     return matches
// }
// const res2 = selectDiv2(regExp, str)
// console.log(res2);

// matchAll
function selectDiv3(regExp, str) {
    let matches = []

    // 和exec的返回值一样
    for (let match of str.matchAll(regExp)) { //不使用全局匹配模式会报错，前面的exec不使用全局匹配模式会陷入死循环
        matches.push(match[1])
    }
    return matches
}
const res3 = selectDiv3(regExp, str)
console.log(res3);