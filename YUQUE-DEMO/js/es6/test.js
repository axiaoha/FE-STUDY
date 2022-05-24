function fn() {
  setTimeout(() => {
    console.log("setTimeout");
    return 1;
  }, 1000);
  new Promise((resolve, reject) => {
    resolve();
  }).then((val) => {
    console.log("promise", val);
    return val;
  });
  return 2;
}
console.log("res:", fn());
