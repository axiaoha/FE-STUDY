function fn() {
  return "fn";
}

function* helloWorldGenerator() {
  console.log(1);
  yield "hello";
  console.log(2);
  // yield "world";
  // yield fn();
  // return "ending";
}
var hw = helloWorldGenerator();
console.log(hw.next()); //{ value: 'hello', done: false }
console.log(hw.next()); //{ value: 'world', done: false }
// console.log(hw.next()); //{ value: 'fn', done: false }
// console.log(hw.next()); //{ value: 'ending', done: true }

// function* foo(x) {
//   var y = 2 * (yield x + 1);
//   var z = yield y / 3;
//   return x + y + z;
// }

// var a = foo(5);
// a.next(); // {value:6, done:false}
// a.next(); // {value:NaN, done:false}
// a.next(); // {value:NaN, done:true}

// var b = foo(5);
// b.next(); // { value:6, done:false }
// b.next(12); // { value:8, done:false }
// b.next(13); // { value:42, done:true }
