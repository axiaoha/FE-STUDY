// 父类
function Animal(name) {
    this.name = name
}
Animal.prototype.showName = function() {
    console.log('name:' + this.name);
}
Animal.base = 1
Animal.getCount = function() {
    console.log(1);
}
Animal.getCount()

// 子类
// 构造函数继承+原型继承=组合继承
function Dog(name, color) {
    // 构造函数继承
    Animal.call(this, name)
    this.color = color
}
// 原型继承
Dog.prototype = new Animal()
    // Dog.prototype.constuctor = Dog
let d1 = new Dog('wangcai', 'black')
console.log(d1);
d1.showName()

// EXPAND-01：
// 放到expand.md里面进一步探索，es6的继承可以做到继承父类的静态方法和静态属性
console.log(Dog.base); //'undefined'
// Dog.getCount() //报错：Uncaught TypeError: Dog.getCount is not a function