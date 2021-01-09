// 创建一个拥有特定类型的容器，给容器(<>前面的内容)打标签
// 灵活约束参数的类型，不限制函数传参的类型
// 函数的类型推断不会流入函数体内，使用表达式没法建立明确的类型绑定，泛型可以

// 在函数上的应用
// 像一个占位符、变量，在使用时才动态的填入确定的类型值
// 使用联合类型也需要列举出传参的所有类型，希望得到的效果是能够根据传参数的类型来限定返回结果的类型
function echo(arg: number | boolean): number | boolean {
  return arg;
}
const result3 = echo(true);

function echo1<T>(arg: T): T {
  return arg;
}
const result = echo1(true);

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
const result2 = swap(["string", 123]);
console.log(result2[0].toString());
console.log(result2[1].length);

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
const arrs = echoWithArr([1, 2, 3]);

//  约束泛型
interface IWithLength {
  length: number;
}
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
const str = echoWithLength("string");
const obj = echoWithLength({
  length: 1,
});
const arr2 = echoWithLength([1, 2, 3]);

// 在类上的应用
class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item);
  }
  pop(): T {
    return this.data.shift();
  }
}
const queue = new Queue<number>();
queue.push(1);
// queue.push("str");
console.log(queue.pop().toFixed());
// console.log(queue.pop().toFixed()); // string没有toFixed方法，但是在这里不会提示错误

// 在interface上的应用
interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = { key: 1, value: "str1" };
let kp2: KeyPair<string, number> = { key: "str2", value: 2 };
let arr: number[] = [1, 2, 3];
let arrTwo: Array<number> = [1, 2, 3];
