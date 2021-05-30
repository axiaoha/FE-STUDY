// import { name } from "./module.js";
// console.log(name);

// default是关键词 在import不能当作一个变量使用
import fooName, {
  // fooName,
  hello as fooHello,
  Person as fooPerson,
  // default as fooPerson
} from "./module.js";
console.log(fooName);
console.log(fooHello());
console.log(new fooPerson());
