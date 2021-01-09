// 类的困境：一个类只能继承自一个父类，但不同类之间有共同的特性但又难以用一个父类（因为这些类难以找到一个合适的父类）提取出来，导致以子类继承父类的方法难以完成提取共同特性的这项任务
// 解决：类可以使用implements来实现接口

// car和cellphone有相通的地方都有switchRadio这个方法，如果要提取switchRadio方法，但是又找不到一个合适的父类来提取switchRadio这个方法，就可以使用接口
interface Radio {
  switchRadio(trigger: boolean): void;
}
interface Battery {
  checkBatteryStatus(): void;
}
interface RadioAndBattery extends Radio {
  checkBatteryStatus(): void;
}
class Car implements Radio {
  switchRadio(trigger) {}
}

// class CellPhone implements Radio, Battery {
//   switchRadio(trigger) {}
//   checkBatteryStatus() {}
// }

class CellPhone implements RadioAndBattery {
  switchRadio(trigger) {}
  checkBatteryStatus() {}
}
