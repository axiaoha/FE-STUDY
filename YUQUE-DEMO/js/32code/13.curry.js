function curry(fn, ...args) {
  var length = fn.length;
  return function () {
    var _args = [...args, ...arguments];
    if (_args.length < length) {
      return curry.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});
fn("a", "b", "c"); // ["a", "b", "c"]
fn("a", "b")("c"); // ["a", "b", "c"]
fn("a")("b")("c"); // ["a", "b", "c"]
fn("a")("b", "c"); // ["a", "b", "c"]
