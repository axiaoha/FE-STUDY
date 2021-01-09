// var Direction;
// (function (Direction) {
//   Direction[(Direction["Up"] = 0)] = "Up";
//   Direction[(Direction["Down"] = 1)] = "Down";
//   Direction[(Direction["Left"] = 2)] = "Left";
//   Direction[(Direction["Right"] = 3)] = "Right";
// })(Direction || (Direction = {}));
// console.log(Direction.Up);
// console.log(Direction[0]);

// // number enums
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right,
// }
// // 双向赋值
// console.log(Direction.Up); // 0
// console.log(Direction[0]); // Up

// // string enums
// var Direction;
// (function (Direction) {
//   Direction["Up"] = "UP";
//   Direction["Down"] = "DOWN";
//   Direction["Left"] = "LEFT";
//   Direction["Right"] = "RIGHT";
// })(Direction || (Direction = {}));
// var value = "UP";
// if (value === Direction.Up) {
//   console.log("go up!");
// }
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const value = "UP";
if (value === Direction.Up) {
  console.log("go up!");
}

// 常量枚举,只有常量值可以进行枚举，计算值不能进行枚举
// var value = "UP";
// if (value === "UP" /* Up */) {
//   console.log("go up!");
// }
// const enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }
// const value = "UP";
// if (value === Direction.Up) {
//   console.log("go up!");
// }
