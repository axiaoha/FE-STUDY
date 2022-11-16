document.querySelector("#parent").addEventListener("click", (e) => {
  console.log("#parent", e.timeStamp);
});
document.querySelector("#child").addEventListener("click", (e) => {
  console.log("#child", e.timeStamp);
});
console.log(
  document.querySelector("#parent") === document.querySelector("#parent")
);
