function myInstanceof(obj, ctor) {
  if (typeof obj !== "object" || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (true) {
    // Object.prototype.__proto__ === null // true
    if (proto === null) return false;
    if (proto === ctor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

var reg = /a/;
console.log(myInstanceof(reg, RegExp));
