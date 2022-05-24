const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);

const f = (x) => x + 1;
const g = (x) => x * 2;
const t = (x, y) => x + y;

let fgt = compose(f, g, t);
fgt(1, 2); // 3 -> 6 -> 7

// const split = curry((x, str) => str.split(x));
// const join = curry((x, arr) => arr.join(x));
// const replaceSpaceWithComma = compose(join(","), split(" "));
// const replaceCommaWithDash = compose(join("-"), split(","));
