// 1. bind 函数会返回一个函数，且可以传入参数
// 2. 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
Function.prototype.bind = function (context, ...args) {
  const self = this;
  const fn = function () {};
  const fBound = function (...newArgs) {
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(newArgs)
    );
  };
  fn.prototype = this.prototype;
  fBound.prototype = new fn();
  return fBound;
};

var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = "kevin";
var bindFoo = bar.bind(foo, "daisy");
var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
