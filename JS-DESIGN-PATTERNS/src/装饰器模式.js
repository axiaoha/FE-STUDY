// 为对象添加新功能
// 不改变其原有的结构和功能
// like：手机上的指扣，不改变手机的结构和功能，只是起一个支撑手机的作用
// class Circle {
//   draw() {
//     console.log("画一个圆形");
//   }
// }
// class Decorator {
//   constructor(circle) {
//     this.circle = circle;
//   }
//   draw() {
//     this.circle.draw();
//     this.setRedBorder(this.circle);
//   }
//   setRedBorder(circle) {
//     console.log("设置红色边框");
//   }
// }
// let circle = new Circle();
// circle.draw();
// console.log("---分割线---");
// let dec = new Decorator(circle);
// dec.draw();

// 场景一：装饰器
// @testDec
// class Demo {}
// function testDec(target) {
//   target.isDec = true;
// }
// alert(Demo.isDec);

// function testDec(isDec) {
//   return function (target) {
//     target.isDec = isDec;
//   };
// }
// @testDec(false)
// class Demo {}
// alert(Demo.isDec);

// 场景二：mixin示例
// function mixins(...list) {
//   return function (target) {
//     Object.assign(target.prototype, ...list);
//   };
// }
// const Foo = {
//   foo() {
//     alert("foo");
//   },
// };
// @mixins(Foo)
// class MyClass {}
// let obj = new MyClass();
// obj.foo();

// 场景三：装饰方法
// descriptor属性描述对象(Object.defineProperty中会用到)，原来的值如下{
//   enumerable: false,
//   configurable: false,
//   writable: false,
//   value: 'static'
// });
function readonly(target, name, descriptor) {
  console.log("target", target); // Person.prototype
  console.log("descriptor", descriptor);
  descriptor.writable = false;
  return descriptor;
}
class Person {
  constructor() {
    this.first = "A";
    this.last = "B";
  }
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}
console.log(Person.prototype);
// Object.defineProperty(Person.prototype, "name", {
//   writable: false,
// });
var p = new Person();
console.log(p.name());
console.log(typeof p.name);
p.name = function () {}; //改了不报错，但是改了没有用，还是之前的值
console.log(p.name);

// function log(target, name, descriptor) {
//   var oldValue = descriptor.value;
//   descriptor.value = function () {
//     console.log(`calling ${name} with`, arguments);
//     return oldValue.apply(this, arguments);
//   };
//   return descriptor;
// }
// class Math {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }
// const math = new Math();
// const result = math.add(2, 4);
// console.log("result", result);

// class Person {
//   constructor(children) {
//     this.children = children;
//   }
//   @nonenumerable
//   get kidCount() {
//     return this.children.length;
//   }
// }
// function nonenumerable(target, name, descriptor) {
//   descriptor.enumerable = false;
//   return descriptor;
// }
// const p = new Person(["xiaoha", "kong"]);
// console.log(p.kidCount); //Cannot read property 'length' of undefined

// 设计原则验证
// 将现有对象和装饰器进行分离，两者独立存在
// 符合开放封闭原则
