// import { common } from "./common";
// console.log(`first  ${common}`);
import { getCommonName } from "./common";
const name = getCommonName();
function fn() {
  console.log("this is fn");
}
fn();
console.log(`first  ${name}`);
