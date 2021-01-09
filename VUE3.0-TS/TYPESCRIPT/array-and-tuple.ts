let arrOfNumber: number[] = [1, 2, 3];
arrOfNumber.push(4); //ts的功能之一丰富的接口提示,定义好类型之后输入点语法会自动提示数组有的方法

function test() {
  // arguments作为类数组在ts里被定义成了IArguments类型，不能被赋值给数组类型的变量
  // let arr: any[] = arguments;
  console.log(arguments);
}

// 数组将同一类型的数据聚合到一起，需要聚合不同类型的数据就需要用到元祖
let user: [string, number] = ["aixaoha", 20]; //数组长度不匹配(但可以使用数组的方法添加越界元素，只要类型匹配)或者对应类型不匹配都会报错
user.push(1);
// user.push(false);
user.push("zerobaek");
