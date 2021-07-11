const marked = require("marked");
module.exports = (source) => {
  // 需要使用该loader加载的目标文件
  // console.log("sources", source);
  // 加载的结果必须要是js代码（原因：webpack打包会把加载的结果直接拼接到模块当中，不是js代码会导致语法错误），如果不是需要通过别的加载器将其转换为js代码
  // return "hello";
  const html = marked(source);
  // 使用JSON.stringify是为了防止引号和换行符导致的语法错误
  // return `module.exports = ${JSON.stringify(html)}`;
  return html;
};
