const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
  },
  module: {
    rules: [
      {
        test: /.md$/,
        // 先用markdown-loader加载再用html-loader加载，markdown-loader将md文件转换为html，html-loader将html文件转化为js代码
        use: ["html-loader", "./markdown-loader"],
      },
    ],
  },
};
