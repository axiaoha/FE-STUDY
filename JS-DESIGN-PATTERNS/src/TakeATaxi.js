// 打车时，可以打专车或者快车。任何车都有车牌号和名称。
// 不同的车价格不同，快车每公里1元，专车每公里2元。
// 行程开始时，显示车辆信息。
// 行程结束时，显示打车金额（假定行程就5公里）

class Car {
  constructor(number, name) {
    this.number = number;
    this.name = name;
  }
}
class PrivateCar extends Car {
  constructor(number, name, price) {
    super(number, name);
    this.price = 2;
  }
}

class ExpressCar extends Car {
  constructor(number, name) {
    super(number, name);
    this.price = 1;
  }
}

class Trip {
  constructor(car) {
    this.car = car;
  }
  start() {
    return `车辆名称：${this.car.name} - 车牌号：${this.car.number}`;
  }
  end() {
    return `打车金额：${this.car.price * 5}`;
  }
}

let pc = new PrivateCar(1, "pc");
let trip1 = new Trip(pc);
console.log(trip1.start());
console.log(trip1.end());

let ec = new ExpressCar(2, "ec");
let trip2 = new Trip(ec);
console.log(trip2.start());
console.log(trip2.end());
