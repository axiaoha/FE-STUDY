// 先使用node启一个本地服务，不然访问本地文件夹会报跨域
// 安装：
// npm install http-server -g
// npm install -g anywhere
// 在cmd运行：
// http-server -c-1(只输入http-server的话，更新了代码后，页面不会同步更新)
function ajax(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(xmlhttp.responseText);
    }
  }
}
ajax("static/a.json", (res) => {
  console.log(res);
  ajax("static/b.json", (res) => {
    console.log(res);
    ajax("static/c.json", (res) => {
      console.log(res);
    });
  });
});
