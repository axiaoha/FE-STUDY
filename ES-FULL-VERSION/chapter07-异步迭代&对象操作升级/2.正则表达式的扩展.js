// dot dotAll
// dot . 不是所有的都能匹配，dotAll可以全部匹配
// const reg = /./
// console.log(reg.test('5')); //true
// console.log(reg.test('x')); //true
// console.log(reg.test('\n')); //false 换行符
// console.log(reg.test('\r')); //false 回车
// console.log(reg.test('\u{2028}')); //false 行分隔符 
// console.log(reg.test('\u{2029}')); //false 段分隔符

// const reg = /./s //dotAll
// console.log(reg.test('5')); //true
// console.log(reg.test('x')); //true
// console.log(reg.test('\n')); //true 换行符
// console.log(reg.test('\r')); //true 回车
// console.log(reg.test('\u{2028}')); //true行分隔符 
// console.log(reg.test('\u{2029}')); //true 段分隔符

// 修饰符 g(全局匹配) i(忽略大小写) m(跨行匹配) y(粘性的) u(匹配unicode) s(dotAll模式)

// 具名组匹配
// const date1 = /(\d{4})-(\d{2})-(\d{2})/.exec('2020-12-11')
// console.log(date1); //["2020-12-12", "2020", "12", "12"] groups属性值为undefined
// const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
// const date2 = reg.exec('2020-12-11')
// console.log(date2); //groups属性值为 {year: "2020", month: "12", day: "11"}
// const groups = date2.groups
// console.log(groups);

// 后行断言 先行断言
const str1 = 'ecmaxxscript'
const str2 = 'ecmascript'

// 先行断言 先去匹配前面的字符串， 再看后面是不是匹配
console.log(str1.match(/ecma(?=script)/)); //null 
console.log(str2.match(/ecma(?=script)/)); //

// 后行断言 后面的内容是固定的， 但是前面的内容有一定的匹配模式
console.log(str2.match(/(?<=ecma)script/));
console.log(str2.match(/(?<!ecma)script/)); //null