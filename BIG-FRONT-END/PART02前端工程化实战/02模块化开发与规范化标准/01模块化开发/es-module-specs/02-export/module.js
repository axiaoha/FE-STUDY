// export const name = "es modules";
// export function hello() {
//   console.log("hello");
// }
// export class Person {}

const name = "es modules";
function hello() {
  console.log("hello");
}
class Person {}
export {
  // name as fooName,
  hello,
  Person,
  // Person as default
};

export default name;
