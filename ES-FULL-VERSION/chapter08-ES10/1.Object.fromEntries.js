// Object.fromEntries()

// const obj = {
//     name: 'axiaoha',
//     age: 23
// }
// const entries = Object.entries(obj)
// console.log(entries);
// const fromEntries = Object.fromEntries(entries)
// console.log(fromEntries);

// // map - > 对象
// const map = new Map()
// map.set('name', 'axiaoha')
// map.set('age', 23)
// console.log(map);
// const fromEntries = Object.fromEntries(map)
// console.log(fromEntries);

const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.fromEntries(Object.entries(course).filter(([key, val]) => val > 80))
console.log(res);