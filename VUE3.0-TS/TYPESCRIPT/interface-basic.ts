// 可以描述各种类型，只能用来做检查，因为js里面并没有接口的概念，不会被转换
// 对对象的形状(shape)进行描述
// Duck Typing(鸭子类型)

// 可以在接口名前加I提示这是接口类型
interface IPerson {
  readonly id: number; // 只读属性
  name: string;
  age?: number; // 可选属性
}
// 多、少属性都不行
let p: IPerson = {
  id: 1,
  name: "axiaoha",
  age: 24, // 可选属性
};
// readonly和const的区别：readonly用于对象属性，const用于定义变量
// p.id = 2; // 只读属性不可改
