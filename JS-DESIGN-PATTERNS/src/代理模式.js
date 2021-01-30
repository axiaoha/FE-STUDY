// 使用者无权访问目标对象
// 中间加代理，通过代理做授权和控制

class ReadImg {
  constructor(fileName) {
    this.fileName = fileName;
    this.loadFromDisk();
  }
  display() {
    console.log("display... " + this.fileName);
  }
  loadFromDisk() {
    console.log("loading... " + this.fileName);
  }
}
class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName);
  }
  display() {
    this.realImg.display();
  }
}
let proxyImg = new ProxyImg("1.png");
proxyImg.display();

// 明星经纪人
let star = {
  name: "nct",
  age: 5,
  phone: "127",
};
let agent = new Proxy(star, {
  get: function (target, key) {
    if (key === "phone") {
      return "2016";
    }
    if (key === "price") {
      return 120000;
    }
    return target[key];
  },
  set: function (target, key, val) {
    if (key === "customPrice") {
      if (val < 100000) {
        throw new Error("价格太低");
      } else {
        target[key] = val;
        return true;
      }
    }
  },
});
console.log(agent.name);
console.log(agent.age);
console.log(agent.phone);
console.log(agent.price);
// agent.customPrice = 90000;
agent.customPrice = 190000;
console.log(agent.customPrice);
agent.price = 140000;
console.log(agent.price);
console.log(star.phone);

// 设计原则验证
// 代理类和目标类分离，隔离开目标类和使用者
// 符合开放封闭原则

// 代理模式 VS 适配器模式
// 适配器模式：提供一个不同的接口(如不同版本的插头)(可以访问目标对象，但是不能正常使用)
// 代理模式：提供一个一模一样的接口(无权访问目标对象，但是想访问目标对象)

// 代理模式 VS 装饰器模式
// 装饰器模式：扩展功能，原有功能不变且可直接使用
// 代理模式 ：显示原有功能，但是会被限制
