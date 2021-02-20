// // 原型模式
// // clone自己，生成一个新对象 -- Objecta.create(基于一个原型创建一个对象)
// let prototype = {
//   getName() {
//     return this.first + " " + this.last;
//   },
//   say() {
//     console.log("hello");
//   },
// };
// let x = Object.create(prototype);
// x.first = "her";
// x.last = "gun";
// console.log(x.getName());
// x.say();
// let y = Object.create(prototype);
// y.first = "zero";
// y.last = "beak";
// console.log(y.getName());
// y.say();

// 桥接模式
// 把抽象化与现实化解耦
// 使得二者可以独立变化

// 组合模式
// 生成树形结构，表示“整体-部分”关系
// 让整体和部分都具有一致的操作方式

// 享元模式
// 共享内存（主要考虑内存，而非效率）
// 相同的数据，共享使用
// 思想有点类似于事件委托（将事件代理到高层节点上，如果都绑定在当前节点，对内存开销大，使用e.target确定元素即可）

// 策略模式
// 不同策略分开处理
// 避免出现大量if else 或者 switch case

// 模板方法模式

// // 职责链模式
// // 一步操作可能分为多个职责角色来完成
// // 把这些角色都分开，然后用一个链串起来
// // 将发起者和各个处理者进行隔离
// // 链式操作
// class Action {
//   constructor(name) {
//     this.name = name;
//     this.nextAction = null;
//   }
//   setNextAction(action) {
//     this.nextAction = action;
//   }
//   handle() {
//     console.log(`${this.name}审批完成`);
//     if (this.nextAction != null) {
//       this.nextAction.handle();
//     }
//   }
// }
// let a1 = new Action("组长");
// let a2 = new Action("经理");
// let a3 = new Action("总监");
// a1.setNextAction(a2);
// a2.setNextAction(a3);
// a1.handle();

// // 命令模式
// // 执行命令时，发布者和执行者分开
// // 中间加入命令对象，作为中转站
// // js中的应用:
// // 网页富文本编辑器操作，浏览器封装了一个命令对象
// // document.execCommand("bold")
// // document.execCommand("undo")
// // 接收者
// class Receiver {
//   exec() {
//     console.log("执行");
//   }
// }
// // 命令者
// class Command {
//   constructor(receiver) {
//     this.receiver = receiver;
//   }
//   cmd() {
//     console.log("执行命令");
//     this.receiver.exec();
//   }
// }
// // 触发者
// class Invoker {
//   constructor(command) {
//     this.command = command;
//   }
//   invoke() {
//     console.log("开始");
//     this.command.cmd();
//   }
// }
// // 士兵
// let soldier = new Receiver();
// // 小号手
// let trumpeter = new Command(soldier);
// // 将军
// let general = new Invoker(trumpeter);
// general.invoke();

// // 备忘录模式
// // 随时记录一个对象的状态变化
// // 随时可以恢复之前的某个状态（如撤销功能）
// // 备忘类
// class Memento {
//   constructor(content) {
//     this.content = content;
//   }
//   getContent() {
//     return this.content;
//   }
// }
// // 备忘列表
// class CareTaker {
//   constructor() {
//     this.list = [];
//   }
//   add(memento) {
//     this.list.push(memento);
//   }
//   get(index) {
//     return this.list[index];
//   }
// }
// // 编辑器
// class Editor {
//   constructor() {
//     this.content = null;
//   }
//   setContent(content) {
//     this.content = content;
//   }
//   getContent() {
//     return this.content;
//   }
//   saveContentToMemento() {
//     return new Memento(this.content);
//   }
//   getContentFromMemento(memento) {
//     this.content = memento.getContent();
//   }
// }
// let editor = new Editor();
// let careTaker = new CareTaker();
// editor.setContent("111");
// editor.setContent("222");
// careTaker.add(editor.saveContentToMemento());
// editor.setContent("333");
// careTaker.add(editor.saveContentToMemento());
// editor.setContent("444");
// console.log(editor.getContent());
// editor.getContentFromMemento(careTaker.get(1)); //撤销
// console.log(editor.getContent());
// editor.getContentFromMemento(careTaker.get(0)); //撤销
// console.log(editor.getContent());

// // 中介者模式
// class A {
//   constructor() {
//     this.number = 0;
//   }
//   setNumber(num, m) {
//     this.number = num;
//     if (m) {
//       m.setB();
//     }
//   }
// }
// class B {
//   constructor() {
//     this.number = 0;
//   }
//   setNumber(num, m) {
//     this.number = num;
//     if (m) {
//       m.setA();
//     }
//   }
// }
// class Mediator {
//   constructor(a, b) {
//     this.a = a;
//     this.b = b;
//   }
//   setB() {
//     let number = this.a.number;
//     this.b.setNumber(number * 100);
//   }
//   setA() {
//     let number = this.b.number;
//     this.a.setNumber(number / 100);
//   }
// }
// let a = new A();
// let b = new B();
// let m = new Mediator(a, b);
// a.setNumber(100, m);
// console.log(a.number, b.number);
// b.setNumber(100, m);
// console.log(a.number, b.number);

// 访问者模式
// 将数据操作和数据结构分离

// 解释器模式
// 描述语言语法如何定义，如何解释和编译
