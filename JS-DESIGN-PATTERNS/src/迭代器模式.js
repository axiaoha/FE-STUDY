// 顺序访问集合
// 使用者无需知道集合的内部结构（封装）
class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++];
    }
    return null;
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false;
    }
    return true;
  }
}
class Container {
  constructor(list) {
    this.list = list;
  }
  getIterator() {
    return new Iterator(this);
  }
}
let arr = [1, 2, 3, 4];
let container = new Container(arr);
let iterator = container.getIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}

// 场景
// es6 Iterator
// es6中，有序集合的数据类型已经有很多
// Array Map Set String TypedArray arguments NodeList
// 需要一个统一的遍历接口来遍历所有数据类型
// object不是有序集合，可以用Map代替
// 以上数据类型都有[Symbol.iterator]属性
// 属性值是函数，执行函数返回一个迭代器
// 这个迭代器就有next方法可顺序迭代子元素
