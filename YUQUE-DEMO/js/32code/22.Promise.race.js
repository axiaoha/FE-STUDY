Promise.myRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
};
const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);
Promise.myRace([p2, p3, p1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
