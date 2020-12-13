// JSON.superset
// 超集 想让es完全兼容JSON支持的文本， 早期JSON只是es的子集（ JSON支持行分隔符\u{2028}、 段分隔符\u{2029}， 但是es不支持）
eval("var str = 'axiaoha';\u2029 function foo(){return str;}")
console.log(foo()); //不会报错

// JSON.stringify()增强能力
// JSON.stringify的解析范围：0xD800~0xDFFF 超出显示会有问题，增强能力就是增大这个范围
console.log(JSON.stringify('\uD83D\uDE0E'))
console.log(JSON.stringify('\uD83D'))