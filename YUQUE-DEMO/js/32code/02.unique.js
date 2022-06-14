// 数组去重
// https://segmentfault.com/a/1190000016418021
var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
  {
    a: 1,
    b: 2,
  },
  {
    a: 1,
    b: 2,
  },
  {
    b: 2,
    a: 1,
  },
];

// // 1、Set
// console.log([...new Set(arr)]);

// 2、for splice
// function unique(arr) {
//   let len = arr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (JSON.stringify(arr[i]) === JSON.stringify(arr[j])) {
//         arr.splice(j, 1);
//         len--;
//         j--;
//       }
//     }
//   }
//   return arr;
// }
// console.log(unique(arr));

// // 3、indexOf/include
// function unique(arr) {
//   const res = [];
//   for (let i = 0; i < arr.length; i++) {
//     // if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
//     if (!res.includes(arr[i])) res.push(arr[i]);
//   }
//   return res;
// }
// console.log(unique(arr));

// // 4、filter
// function unique(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) === index);
// }
// console.log(unique(arr));

// // 5、hasOwnProperty
// function unique(arr) {
//   var obj = {};
//   return arr.filter(function (item, index, arr) {
//     const key = typeof item + JSON.stringify(item);
//     return obj.hasOwnProperty(key) ? false : (obj[key] = true);
//   });
// }
// console.log(unique(arr));

// // 6、Map
// function unique(arr) {
//   const map = new Map();
//   const res = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (!map.has(arr[i])) {
//       map.set(arr[i], true);
//       res.push(arr[i]);
//     }
//   }
//   return res;
// }
// console.log(unique(arr));

// // 7、reduce+includes
// function unique(arr) {
//   return arr.reduce(
//     (acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]),
//     []
//   );
// }
// console.log(unique(arr));
