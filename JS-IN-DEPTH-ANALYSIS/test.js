function fn1() {
  console.log(1);
  fn2();
  console.log(2);
}
function fn2() {
  return 3;
}
fn1();
