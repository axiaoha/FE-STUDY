// 类(Class)：定义了一切事物的抽象特点
// 对象(Object)：类的实例
// 面向对象(OOP)三大特性：
// 封装(将数据操作的细节隐藏起来，只暴露对外的接口，外部的调用端不会知道细节，只能通过对外提供的接口来访问对象)
// 继承(子类可以继承父类，子类除了拥有父类的所有特征外，还会有一些更加具体的特性)
// 多态(由继承可以产生很多子类，同一个方法可以有不同的响应)

class Animal {
  constructor(name) {
    this.name = name;
  }
  run() {
    return `${this.name} is running`;
  }
}
const snake = new Animal("snake");
console.log(snake.run()); // 实例化的对象调用封装好的方法

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}
const dog = new Dog("dog");
console.log(dog.run());
console.log(dog.bark());

// 多态
class Cat extends Animal {
  static categories = ["mammal"];
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  run() {
    return "Meow," + super.run();
  }
}
const cat = new Cat("cat");
console.log(cat.run());
console.log(Cat.categories);
