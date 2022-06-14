// 实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
function add() {
  const arr = [...arguments];
  function fn() {
    arr.push(...arguments);
    return fn;
  }
  fn.getResult = function () {
    return arr.reduce((acc, cur) => acc + cur, 0);
  };
  return fn;
}

console.log(add(1)(2)(3)(4).getResult());
console.log(add(1)(1, 2, 3)(2).getResult());
