// 数组扁平化
const arr = [1, [2, [3, [4, 5]]], 6];
// const res1 = arr.flat(2);
// console.log(res1);// [ 1, 2, 3, [ 4, 5 ], 6 ]

// 展开一层
// const res = arr.flat();
// const res = [].concat(...arr);
// const res = arr.reduce((acc, cur) => acc.concat(cur), []);
// console.log(res);

// 展开多层
// reduce + concat + isArray + recursivity
function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, cur) =>
          acc.concat(Array.isArray(cur) ? flatDeep(cur, d - 1) : cur),
        []
      )
    : arr.slice();
}
// console.log(flatDeep(arr, 2));
// console.log(flatDeep(arr, Infinity));

// 堆栈stack
function stackFlatDeep(arr, d = 1) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.shift();
    if (Array.isArray(next) && d) {
      stack.unshift(...next);
      d--;
    } else {
      res.push(next);
    }
  }
  return res;
}
console.log(stackFlatDeep(arr, 1));
console.log(stackFlatDeep(arr, 2));
console.log(stackFlatDeep(arr, Infinity));
