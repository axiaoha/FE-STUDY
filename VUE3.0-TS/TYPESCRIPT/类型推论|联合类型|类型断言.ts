// 类型推论
// let str = "str";
// 由变量的赋值推断出该变量是string类型
// str = 123;

// 联合类型 union types
let numberOrString: number | string = 123;
// 该变量访问number和string的共有属性或方法是没有问题的，但是访问只有number或者string的属性或方法会提示错误，比如访问string的length属性
numberOrString.toString(); // 没问题
// numberOrString.length// 提示错误

// 类型断言：告诉编译器开发者更了解这个变量的类型，不希望编译器再提示错误
function getlength(input: string | number): number {
  // 没有使用类型断言前，会提示错误，因为此时的变量只有使用number和string的共有属性和方法时才不会提示错误
  // return input.length || input.toString().length;

  // 使用类型断言
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}

//  类型守卫 type guard 使用typeof和instanceof
function getlength2(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.toString().length;
  }
}
