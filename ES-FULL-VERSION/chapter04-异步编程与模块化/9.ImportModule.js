// import def, { a, b as name, sum, obj } from './8.module.js'
// console.log(a);
// console.log(sum(1, 2));
// console.log(obj.name);
// console.log(name);
// console.log(def);

// import mod from './8.module.js'
// console.log(mod.a);
// console.log(mod.sum(1, 2));
// console.log(mod.obj.name);
// console.log(mod.def);


import * as mod from './8.module.js'
// mod对应的是一个Module对象
console.log(mod);
console.log(mod.default.a);
console.log(mod.default.sum(1, 2));
console.log(mod.default.obj.name);
console.log(mod.default.def);