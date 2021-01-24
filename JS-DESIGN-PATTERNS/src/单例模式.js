// 系统中被唯一使用
// 一个类只有一个实例

// class SingleObject {
//   login() {
//     console.log("login");
//   }
// }
// SingleObject.getInstance = (function () {
//   let instance;
//   return function () {
//     if (!instance) {
//       instance = new SingleObject();
//     }
//     return instance;
//   };
// })();
// // 这里只能使用静态函数getInstance，不能直接new SingleObject()
// let obj1 = SingleObject.getInstance();
// obj1.login();
// let obj2 = SingleObject.getInstance();
// obj2.login();
// console.log(obj1 === obj2); //两者完全相等

// 场景一：jQuery只有一个$

// 场景二：模拟登录框
class LoginForm {
  constructor() {
    this.state = "hide";
  }
  show() {
    if (this.state === "show") {
      alert("登录框已经打开");
      return;
    }
    console.log("打开登录框");
    this.state = "show";
  }
  hide() {
    if (this.state === "hide") {
      alert("登录框已经关闭");
      return;
    }
    console.log("关闭登录框");
    this.state = "hide";
  }
}
LoginForm.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();
let login1 = LoginForm.getInstance();
console.log(login1);
login1.show();
let login2 = LoginForm.getInstance();
login2.show();

// 其他
// 购物车（和登录框类似）
// vuex和redux中的store

// 设计原则验证
// 符合单一职责原则，只实例化唯一的对象
// 没法具体开放封闭原则，但是绝对不违反开放封闭原则
