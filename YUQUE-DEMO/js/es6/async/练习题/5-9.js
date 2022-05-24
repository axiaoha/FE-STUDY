async function testAsync() {
  // console.log("执行testAsync");
  // return Promise.resolve("hello async");
  return new Promise((res) => {
    res("hello async");
  });
  // return "hello async";
}

async function test() {
  const v2 = await testAsync();
  // const v2 = await Promise.resolve(Promise.resolve("hello async"));
  console.log(v2);
}

test();

var promise = new Promise((resolve) => {
  resolve("promise1");
});
promise
  .then((val) => {
    console.log("1:", val);
    return "promise2";
  })
  .then((val) => {
    console.log("2:", val);
    return "promise3";
  })
  .then((val) => {
    console.log("3:", val);
  });
