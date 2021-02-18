const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/迭代器模式.js",
  output: {
    path: __dirname,
    filename: "./release/bundle.js", // release 会自动创建
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // bundle.js 会自动注入
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "./release"), // 根目录
    open: true, // 自动打开浏览器
    port: 9000, // 端口
    // proxy: {
    //     '/api/*': {
    //         target: 'http://localhost:8880'
    //     }
    // }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};