function deepClone(target) {
  const isObject = typeof target !== "object" || target === null;
  if (isObject) {
    return target;
  }
  const res = Array.isArray(target) ? [] : {};
  const symbolKeys = Object.getOwnPropertySymbols(target);
  if (symbolKeys.length) {
    symbolKeys.forEach((key) => {
      res[key] =
        typeof target[key] !== "object" || target[key] === null
          ? target[key]
          : deepClone(target[key]);
    });
  }
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      res[key] =
        typeof target[key] !== "object" || target[key] === null
          ? target[key]
          : deepClone(target[key]);
    }
  }
  return res;
}
const obj = {
  a: {
    b: 1,
    c: {
      d: 2,
      e: 3,
    },
  },
};
const copyObj = obj;
const cloneObj = deepClone(obj);
obj.a.c.d = 4;
console.log(obj.a.c.d, cloneObj.a.c.d, copyObj.a.c.d);
