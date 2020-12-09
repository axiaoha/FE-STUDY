// javascript是一种基于对象(object - based) 的语言
// 类(class)是对象(object)的模板，第一轮同一组对象共有的属性和方法

function People(name, age) {
    // 实例属性
    this.name = name
    this.age = age

    // 一般不会把方法放在构造函数里面，每次新建一个实例都会新建这个方法new Function，一般会放到原型下面
    // this.showName = function() {
    //     console.log('name:' + this.name);
    // }
    People.count++
}
// 静态属性
People.count = 0
People.getCount = function() {
    console.log('当前共有' + People.count + '个人');
}

// 实例方法
People.prototype.showName = function() {
    console.log('name:' + this.name);
}
let p1 = new People('axiaoha', 23)
console.log(p1);
p1.showName()
console.log(People.count);
People.getCount()