function* gen() {
  console.log("gen");
  var r = yield "hello";
}
const g = gen();
console.log(g.next());
