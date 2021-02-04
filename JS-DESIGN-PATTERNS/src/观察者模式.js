// 发布&订阅
// 一对多

// js实现观察者模式
// 主题，保存状态，状态变化之后触发所有观察者对象
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
  attach(observer) {
    this.observers.push(observer);
  }
}
// 观察者
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name} update,state: ${this.subject.getState()}`);
  }
}
let s = new Subject();
let o1 = new Observer("o1", s);
let o2 = new Observer("o2", s);
let o3 = new Observer("o3", s);
s.setState(1);
s.setState(2);
s.setState(3);

// 场景
// 1、事件绑定，点击按钮相当于状态变化，点击按钮之后会触发所有的事件
// 2、promise（先绑定上then里面的函数，等到promise的状态变化才会执行，从pending变为fulfilled和从pending变为rejected）
// 其他场景
// nodejs中：处理http请求；多进程通讯
// vue和react组件生命周期的触发
// vue watch

// 设计原则验证
// 主题与观察者分离，不是主动触发而是被动监听，两者解耦
// 符合开放封闭原则
