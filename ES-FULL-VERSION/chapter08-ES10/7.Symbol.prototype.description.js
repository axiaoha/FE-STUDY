// Symbol.prototype.description
const s = Symbol('axiaoha')
s.description = "zero"
console.log(s);
console.log(s.description); //axiaoha 只读

const s2 = Symbol()
console.log(s2.description); //undefined