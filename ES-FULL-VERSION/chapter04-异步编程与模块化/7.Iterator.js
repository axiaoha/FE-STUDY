// 是一种接口机制,为各种不同的数据结构提供统一访问的机制
// 主要供for...of消费
// 一句话：不支持遍历的数据结构“可遍历”

// function makeIterator(arr) {
// 	let nextIndex = 0
// 	return {
// 		next() {
// 			return nextIndex < arr.length
// 				? {
// 						value: arr[nextIndex++],
// 						done: false,
// 				  }
// 				: {
// 						value: undefined,
// 						done: true,
// 				  }
// 		},
// 	}
// }
// let it = makeIterator(['a', 'b', 'c'])
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// // 原生具备Iterator接口的数据结构
// // Array
// // Map
// // Set
// // String
// // TypedArray
// // 函数的arguments对象
// // NodeList对象
// let arr = ['a', 'b', 'c']
// console.log(arr)
// let itarr = arr[Symbol.iterator]()
// console.log(itarr.next())
// console.log(itarr.next())
// console.log(itarr.next())
// console.log(itarr.next())

// let map = new Map()
// map.set('name', 'axiaoha')
// map.set('age', 23)
// console.log(map)
// let itmap = map[Symbol.iterator]()
// console.log(itmap.next())
// console.log(itmap.next())
// console.log(itmap.next())

// 实现迭代
let type = {
	all: {
		frontend: ['ES', 'REACT', 'VUE', 'TS'],
		backend: ['JAVA', 'PYTHON', 'SpringBoot'],
		webapp: ['ANDROID', 'IOS'],
	},
}
// for (let t of type) {
// 	console.log(t) //会报错
// }
// 要使type可迭代，需要满足下面两个协议
// 可迭代协议：是否有Symbol.iterator
// 迭代器协议：return {next(){return{value,done}}}
// ---way1---
// type[Symbol.iterator] = function () {
// 	let all = this.all
//     let keys = Reflect.ownKeys(all)
// 	let values = []
// 	return {
// 		next() {
// 			if (!values.length) {
// 				if (keys.length) {
// 					values = all[keys[0]]
// 					keys.shift()
// 				}
// 			}
// 			return {
// 				done: !values.length,
// 				value: values.shift(),
// 			}
// 		},
// 	}
// }
// ---way2: generator---
type[Symbol.iterator] = function* () {
	let all = this.all
	let keys = Reflect.ownKeys(all)
	let values = []
	while (1) {
		if (!values.length) {
			if (keys.length) {
				values = all[keys[0]]
				keys.shift()
				yield values.shift()//返回一个迭代器对象
			} else {
				return false
			}
		} else {
			yield values.shift()//返回一个迭代器对象
		}
	}
}
// for (let t of type) {
// 	console.log(t)
// }
let ittype = type[Symbol.iterator]()
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());
console.log(ittype.next());

