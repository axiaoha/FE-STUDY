// 返回源代码中的实际文本片段
function foo() {
    // 这是es10
    console.log('axiaoha');
}
console.log(foo.toString()); //会把函数体中的空格注释都返回(以前不会)，把函数当成文本返回