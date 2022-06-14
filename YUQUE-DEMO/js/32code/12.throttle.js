// 节流
// 持续触发事件，每隔一段时间，只执行一次事件
// 节流常应用于鼠标不断点击触发、监听滚动事件
function throttle(fn, wait) {
  let timeout = null;
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, wait);
  };
}

var count = 1;
var container = document.getElementById("container");
function getUserAction(e) {
  console.log("getUserAction", this, e);
  container.innerHTML = count++;
}
container.onmousemove = throttle(getUserAction, 1000);
