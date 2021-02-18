// 一个对象有状态变化
// 每次状态变化都会触发一个逻辑
// 不能总是用if else来控制

// 状态（红灯、绿灯、黄灯）
class State {
  constructor(color) {
    this.color = color;
  }
  handle(context) {
    console.log(`turn to ${this.color} light`);
    // 设置状态
    context.setState(this);
  }
}
// 主体
class Context {
  constructor() {
    this.state = null;
  }
  // 获取状态
  getState() {
    return this.state;
  }
  // 设置状态
  setState(state) {
    this.state = state;
  }
}
const context = new Context();
const green = new State("green");
const yellow = new State("yellow");
const red = new State("red");
// green.handle(context);
// console.log(context.getState());
// yellow.handle(context);
// console.log(context.getState());
// red.handle(context);
// console.log(context.getState());

// 有限状态机
// 有限个状态、以及在这些状态之间的变化
// https://github.com/jakesgordon/javascript-state-machine

// 简单的Promise（Promise就是有限状态机）
// Promise三种状态：pending fullfilled rejected
// pending -> fullfilled 或者 pending -> rejected
// 不能逆向变化
import StateMachine from "javascript-state-machine";
let fsm = new StateMachine({
  init: "pending", // 初始化状态
  transitions: [
    { name: "resolve", from: "pending", to: "fullfilled" },
    { name: "reject", from: "pending", to: "rejected" },
  ],
  methods: {
    onResolve: function (state, data) {
      // state - 当前状态机实例
      // data - fsm.resolve(xxx)传递的参数
      console.log("onResolve", state, data);
      data.successList.forEach((fn) => fn(data.img.src));
    },
    onReject: function (state, data) {
      // state - 当前状态机实例
      // data - fsm.reject(xxx)传递的参数
      console.log("onReject", state, data);
      data.failList.forEach((fn) => fn());
    },
  },
});
// 定义 Promise
class MyPromise {
  constructor(fn) {
    this.successList = [];
    this.failList = [];

    fn(
      (img) => {
        // resolve 函数
        fsm.resolve({ ...this, img });
      },
      () => {
        // reject 函数
        fsm.reject(this);
      }
    );
  }
  then(successFn, failFn) {
    this.successList.push(successFn);
    this.failList.push(failFn);
  }
}
// 测试代码
function loadImg(src) {
  const promise = new MyPromise(function (resolve, reject) {
    let img = document.createElement("img");
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject();
    };
    img.src = src;
  });
  return promise;
}
let src = "http://www.imooc.com/static/img/index/logo_new.png";
let result = loadImg(src);
console.log(result);

result.then(
  function (img) {
    console.log("success 1", img);
  },
  function () {
    console.log("failed 1");
  }
);
result.then(
  function (img) {
    console.log("success 2", img);
  },
  function () {
    console.log("failed 2");
  }
);
