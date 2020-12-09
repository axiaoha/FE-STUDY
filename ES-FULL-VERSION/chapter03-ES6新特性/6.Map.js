// let map = new Map([1, 2])
//     // 报错：Uncaught TypeError: Iterator value 1 is not an entry object
// console.log(map);

// let map = new Map([
//     [1, 2],
//     [3, 4]
// ])
// console.log(map);

// let map = new Map([
//     [1, 3],
//     [3, 4]
// ])
// 等同于
// let map = new Map()
// map.set(1, 2)
// map.set(3, 4)
// map.set(1, 3)
//     // map.delete(1)
//     // map.clear()
// console.log(map);
// console.log(map.size); //2
// console.log(map.has(4)); //false 参数代表的不是value
// console.log(map.has(3)); //true 参数代表的是key
// console.log(map.get(1)); //3
// console.log(map.keys(), map.values()); //MapIterator {1, 3} MapIterator {3, 4}

// map.forEach((value, key) => {
//     console.log(value + ',' + key); //3,1  4,3
// })
// for (let [key, value] of map) {
//     console.log(key + ',' + value); //1,3  3,4
// }

// // 键的类型可以是任意的
// let o = function() {
//     console.log('o');
// }
// map.set(o, 4)
// console.log(map.get(o)); //4

// 键值对的存储与key的大小无关，按照set的前后顺序来进行存储
let map = new Map()
map.set(10, 4)
map.set(5, 6)
map.set(7, 8)
console.log(map); //{10 => 4, 5 => 6, 7 => 8}