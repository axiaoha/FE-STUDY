// flat() 方法会按照一个可指定的深度递归遍历数组， 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// const numbers = [1, 2, [3, 4, [5, 6]]]
// console.log(numbers.flat())
//     // [1, 2, 3, 4, [5, 6]]

// const numbers = [1, 2, [3, 4, [5, 6]]]
// console.log(numbers.flat(2))
//     // [1, 2, 3, 4, 5, 6]

// flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。
// 从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。
const numbers = [1, 2, 3]
console.log(numbers.map(x => [x * 2])) // [[2], [4], [6]]
console.log(numbers.flatMap(x => [x * 2])) // [2, 4, 6]
console.log(numbers.map(x => [
        [x * 2]
    ])) // [[2], [4], [6]]
console.log(numbers.flatMap(x => [
        [x * 2]
    ])) // [2, 4, 6]

let arr = ['今天天气不错', '', '早上好']
console.log(arr.map(s => s.split('')))
    // [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
console.log(arr.flatMap(s => s.split('')))
    // ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]