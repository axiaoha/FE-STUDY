const arr = [6, 2, 3, 4, 5];
arr[Symbol.iterator] = function () {
  const target = this;
  const len = target.length;
  let index = 0;
  return {
    next() {
      return {
        value: index < len ? target[index] : undefined,
        done: index++ >= len,
      };
    },
  };
};
const itr = arr[Symbol.iterator]();
console.log(itr.next()); // { value: 6, done: false }
console.log(itr.next()); // { value: 2, done: false }
console.log(itr.next()); // { value: 3, done: false }
console.log(itr.next()); // { value: 4, done: false }
console.log(itr.next()); // { value: 5, done: false }
console.log(itr.next()); // { value: undefined, done: true }

// let index = 1;
// console.log(++index >= 2);
// console.log(index++ >= 2);
