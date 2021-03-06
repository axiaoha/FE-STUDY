// 运行在nodejs环境的文件
const path = require("path");
module.exports = {
  // 工作模式：development（会自动优化打包结果，打包后的代码方便阅读）、production（会自动优化打包结果，打包后的代码不方便阅读）、none（不会对打包结果进行优化）
  mode: "none",
  entry: "./src/index.js",
  // entry: "./src/main.css",
  output: {
    filename: "bundle.js",
    // 必须得是绝对路径
    path: path.join(__dirname, "output"),
    publicPath: "output/", //表示网站的根目录
  },
  // style-loader将css-loader转换过后的结果通过style标签的形式追加到页面上
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"], //从后往前执行
      },
      {
        test: /.jpeg$/,
        // use: "file-loader", //从后往前执行
        // use: "url-loader", // 会将png文件转换为data url
        // 大文件使用file-loader，小文件使用url-loader
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, //10kb
          },
        },
      },
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "a:href"],
          },
        },
      },
    ],
  },
};
