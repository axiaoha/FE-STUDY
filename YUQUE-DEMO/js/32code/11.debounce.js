// 防抖
// 触发高频事件后，在n秒后才执行，如果n秒内事件再次触发，以新的事件触发时间为准，n秒后再执行
// 防抖常应用于用户进行搜索输入节约请求资源
function debounce(fn, wait) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn.bind(this, ...arguments), wait);
  };
}

var count = 1;
var container = document.getElementById("container");
function getUserAction(e) {
  console.log("getUserAction", this, e);
  container.innerHTML = count++;
}
container.onmousemove = debounce(getUserAction, 1000);
