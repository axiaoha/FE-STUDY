class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
  fn1() {
    console.log("fn1");
  }
  fn2() {
    console.log("fn2");
  }
}

class Creator {
  create(name) {
    return new Product(name);
  }
}

// 通过工厂函数把构造函数和使用者隔离开，创建实例的时候有一个统一的入口
let creator = new Creator();
let p = creator.create("p1");
p.init();
p.fn1();

// 场景一：jquery $("p")选取指定的元素,然后对 HTML 元素组或单个元素进行操作。而不是直接通过new jQuery()的方式
class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let index = 0; index < len; index++) {
      this[index] = dom[index];
    }
    this.length = len;
    this.selector = selector || "";
  }
  append(node) {}
  addClass(name) {}
  html(data) {}
}
window.$ = function (selector) {
  return new jQuery(selector);
};

//  场景二：React.createElement
// class Vnode(tag,attrs,children){
// }
// React.createElement = function(tag,attrs,children){
//   return new Vnode(tag,attrs,children )
// }

// 场景三： Vue异步组件

// 设计原则验证：
// 构造函数和创建者分离
// 符合开放封闭原则
