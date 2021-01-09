// TS中的类
// Public：修饰的属性或方法是共有的
// Private：修饰的属性或方法是私有的，不能在所声明的类的外部使用
// Protected：修饰的属性或方法是受保护的，在子类中允许被访问(super.funcname)

class TsAnimal {
  readonly name: string;
  constructor(name) {
    this.name = name;
  }
  // protected run() {
  // private run() {
  run() {
    return `${this.name} is running`;
  }
}
const tsSnake = new TsAnimal("snake");
console.log(tsSnake.run()); // 实例化的对象调用封装好的方法

// 继承
class TsDog extends TsAnimal {
  bark() {
    return `${this.name} is barking`;
  }
}
const tsDog = new TsDog("dog");
console.log(tsDog.run());
console.log(tsDog.bark());

// 多态
class TsCat extends TsAnimal {
  static categories = ["mammal"];
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  run() {
    return "Meow," + super.run();
  }
}
const tsCat = new TsCat("cat");
console.log(tsCat.run());
console.log(TsCat.categories);
