// 类型别名 type-alias
let sum: (x: number, y: number) => number;
const res = sum(1, 2);
type PlusType = (x: number, y: number) => number;
let sum2: PlusType;
const res2 = sum2(2, 3);
type StrOrNumber = string | number;
let res3: StrOrNumber = "123";
res3 = 123;

// 字面量
const string: "name" = "name";
const number: 1 = 1;
type Directions = "Up" | "Down" | "Left" | "Right";
let toWhere: Directions = "Left";

// 交叉类型:和interface的extends有点类似，都是为了实现对象形状的组合和扩展
interface IName {
  name: string;
}
type IPeople = IName & { age: number };
let person: IPeople = { name: "123", age: 123 };
