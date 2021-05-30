const express = require("express");
const artTmpl = require("art-template");
const app = express();
const fs = require("fs");

app.get("/", function (req, res) {
  // 1、获取页面模板
  const tmplateStr = fs.readFileSync("./index.html", "utf-8");
  console.log("tmplateStr", tmplateStr);
  // 2、获取数据
  const data = JSON.parse(fs.readFileSync("./data.json"), "utf-8");
  console.log("data", data);
  // 3、渲染：数据+模板=最终结果
  const html = artTmpl.render(tmplateStr, data);
  // 4、把渲染结果发送给客户端
  res.send(html);
});
app.listen(8004, () => {
  console.log("running");
});
