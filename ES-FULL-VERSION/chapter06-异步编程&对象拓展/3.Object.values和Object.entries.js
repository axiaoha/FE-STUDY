const obj = {
    name: 'axiaoha',
    age: 23
}
const arr = ['a', 'b', 'c']
console.log(Object.keys(obj)); //["name", "age"]
console.log(Object.keys(obj).map(key => obj[key])); //["axiaoha", 23]
console.log(Object.values(obj)); //["axiaoha", 23]
console.log(Object.entries(obj));
// [
//     ["name", "axiaoha"],
//     ["age", 23]
// ]
console.log(Object.entries(arr));
// [
//     ["0", "a"],
//     ["1", "b"],
//     ["2", "c"]
// ]