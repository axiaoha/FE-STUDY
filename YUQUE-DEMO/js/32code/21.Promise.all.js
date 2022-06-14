Promise.myAll = function (promiseArr) {
  return new Promise((resolve, reject) => {
    const result = [];
    let index = 0;
    function addData(key, value) {
      result[key] = value;
      index++;
      if (index === promiseArr.length) {
        resolve(result);
      }
    }
    for (let i = 0; i < promiseArr.length; i++) {
      const current = promiseArr[i];
      if (current instanceof Promise) {
        current.then((value) => {
          addData(i, value);
        }, reject);
      } else {
        addData(i, current);
      }
    }
  });
};
const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);
Promise.myAll([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
