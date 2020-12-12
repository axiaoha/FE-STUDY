// let [a, b, c] = [1, 2, 3]
// console.log(a, b, c);

// let [a, b, [c, d]] = [1, 2, [3, 4]]
// console.log(a, b, c, d);

// let [a, b, [c, d], e = 5] = [1, 2, [3, 4]]
// console.log(a, b, c, d, e); // 1 2 3 4 5

// let user = {
//     // name: 'axiaoha',
//     // age: '23'
// }
// let { age: uage = 18, name = 'aha' } = user
// console.log(uage, name); //key值一一对应

// let str = 'axiaoha'
// let [a, b, c, d, e, f, g] = str
// console.log(a, b, c, d, e, f, g);

// function foo() {
//     console.log(123);
// }
// // let [a = foo()] = [1] //不会输出123，因为是惰性的
// let [a = foo()] = [] //会输出123

// function foo([a, b, c]) {
//     console.log(a, b, c);
// }
// let arr = [1, 2, 3]
// foo(arr)

// function foo({ name, age, school = 'no1' }) {
//     console.log(name, age, school);
// }
// let user = {
//     name: 'axiaoha',
//     age: '23'
// }
// foo(user)

//JSON
let json = '{ "a": "hello", "b": "world" }'
let { a, b } = JSON.parse(json)
console.log(a, b);