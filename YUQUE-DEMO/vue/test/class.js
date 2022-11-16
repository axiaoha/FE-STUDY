class Person {
  constructor(name) {
    this.name = name;
  }
}
function Person1(name) {
  this.name = name;
}
Person.prototype.age = 18;
let p = new Person("aiaoha");
Person1.prototype.age = 25;
let p1 = new Person1("zerobaek");
// // p.__proto__.age = 18;
// console.log(p.name);
// console.log(p.age);
// console.log(Person);
// console.log(p1.name);
// console.log(p1.age);
// console.log(Person1);

for (let key in p) {
  console.log("p key", key);
}
for (let key in p1) {
  console.log("p1 key", key);
}
