const a = (x: number, y: number, z?: number): number => {
  if (typeof z === "number") {
    return x + y + z;
  } else {
    return x + y;
  }
};

// 这里的=>不是指箭头函数，只是用来接函数的返回类型
let b: (x: number, y: number, z?: number) => number = function (x, y, z) {
  return x + y + (z ? z : 0);
};
console.log(b(1, 2, 3));

let c: (x: number, y: number, z?: number) => number = a;

interface ISum {
  (x: number, y: number, z?: number): number;
}
let d: ISum = a;
