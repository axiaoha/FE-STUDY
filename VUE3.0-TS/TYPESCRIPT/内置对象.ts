// global objects
const a: Array<number> = [1, 2, 3];
const date = new Date();
date.getTime();
const reg = /abc/;
reg.test("abc");

// build-in object
Math.pow(2, 2);

// DOM and BOM
let body = document.body;
let allLis = document.querySelectorAll("li");

// utility types
interface IP {
  name: string;
  age: number;
}
let p1: IP = { name: "aixoaha", age: 20 };
type IPartial = Partial<IP>; // 将IPerson里面的属性变成可选
let p2: IPartial = { name: "axiaoha" };
type IOmit = Omit<IP, "name">; //忽视掉IPerson里面的某个属性
let p3: IOmit = { age: 18 };
