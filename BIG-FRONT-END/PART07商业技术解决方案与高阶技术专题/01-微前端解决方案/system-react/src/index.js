// 不需要下载，在微前端引用中react相关的包应该被共用
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(<App />, document.getElementById("root"));
