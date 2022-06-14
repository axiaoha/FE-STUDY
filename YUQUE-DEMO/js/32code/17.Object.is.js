// Object.is() 方法判断两个值是否为同一个值。
// 主要为了解决：
// +0 === -0  // true
// NaN === NaN // false
function is(x, y) {
  if (x === y) {
    // 1/+0 -> Infinity
    // 1/-0 -> -Infinity
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
console.log(is([], []));
console.log(is(+0, -0));
console.log(is(NaN, NaN));

// Object.is(25, 25); // true
// Object.is("foo", "foo"); // true
// Object.is("foo", "bar"); // false
// Object.is(null, null); // true
// Object.is(undefined, undefined); // true
// Object.is(window, window); // true
// Object.is([], []); // false
// var foo = { a: 1 };
// var bar = { a: 1 };
// Object.is(foo, foo); // true
// Object.is(foo, bar); // false

// // Case 2: Signed zero
// Object.is(0, -0); // false
// Object.is(+0, -0); // false
// Object.is(-0, -0); // true
// Object.is(0n, -0n); // true

// // Case 3: NaN
// Object.is(NaN, 0 / 0); // true
// Object.is(NaN, Number.NaN); // true
