function assign(target, ...source) {
  const to = Object(target);
  for (let i = 0; i < source.length; i++) {
    const nextSource = source[i];
    if (nextSource !== null) {
      for (let nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = assign(target, source);
console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
