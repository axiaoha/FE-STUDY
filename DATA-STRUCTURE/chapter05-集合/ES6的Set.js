// 使用Set对象：new add delete has size
// 迭代Set：多种迭代方法、Set与Array互转、求交集/差集

let mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add("str");
let o = { a: 1, b: 2 };
mySet.add(o);
mySet.add({ a: 1, b: 2 });

const has = mySet.has(o);
console.log(has); //true
console.log(mySet.size); //5

mySet.delete(5);

for (let [key, value] of mySet.entries()) {
  console.log(key, value);
}

// const myArr = [...mySet];
const myArr = Array.from(mySet);
const mySet2 = new Set([1, 2, 3, 4]);

const mySet3 = new Set([...mySet].filter((item) => mySet2.has(item)));
const mySet4 = new Set([...mySet].filter((item) => !mySet2.has(item)));

console.log(mySet3);
console.log(mySet4);
