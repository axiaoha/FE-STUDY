const R = require("ramda");
const { compose, curry } = R;
const data = [
  {
    name: "Peter1",
    sex: "M",
    age: 18,
    grade: 32,
  },
  {
    name: "Peter2",
    sex: "M",
    age: 16,
    grade: 14,
  },
  {
    name: "Pete3",
    sex: "F",
    age: 20,
    grade: 66,
  },
];
// R.gt(2, 1) => true  // 判断第一个参数是否大于第二个参数
// R.prop('x', {x: 100}); //=> 100
// R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}

// const isEven = n => n % 2 === 0;
// R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]

// // 1、获取所有年龄小于 18 岁的对象，并返回他们的名称和年龄
// // :: String -> Number -> Object -> Boolean
// const propGt = curry((p, c) => compose(R.gt(c), R.prop(p)));
// // :: Object ->  Boolean
// const ageUnder18 = propGt("age", 18);
// const getAgeUnder18 = compose(
//   R.filter(ageUnder18),
//   R.map(R.pickAll(["name", "age"]))
// );
// console.log("getAgeUnder18", getAgeUnder18(data));

// // 2、查找所有男性用户
// // way1:
// const propEquals = curry((p, e) => compose(R.equals(e), R.prop(p)));
// const male = propEquals("sex", "M");
// const getMales = R.filter(male);
// // way2
// const getSex = (sex) => R.filter(R.propEq("sex", sex));
// const getMales = getSex("M");
// const getFemales = getSex("F");
// console.log("getMales", getMales(data));
// console.log("getFemales", getFemales(data));

// 3、更新一个指定名称用户的成绩（不影响原数组）
// const updatePropBy = curry((byProp, updateProp, match, newValue, obj) => {
//   if (obj[byProp] === match) {
//     let newObj = { ...obj };
//     newObj[updateProp] = newValue;
//     return newObj;
//   }
//   return { ...obj };
// });
// const updatePropByName = updatePropBy("name");
// const updateGradeByName = updatePropByName("grade");
// const updateUsersGradeByName = curry((name, value, arr) =>
//   R.map(updateGradeByName(name, value), arr)
// );
// const result = updateUsersGradeByName("Peter1", 100, data);
// const getGrade = compose(R.prop("grade"), R.find(R.propEq("name", "Peter1")));
// console.log(data, result, getGrade(result));

// // 4、取出成绩最高的 10 名，并返回他们的名称和分数
// const desc = (x) => R.sort(R.descend(R.prop(x)));
// const getGradeTop10 = compose(
//   R.map(R.pickAll(["name", "grade"])),
//   R.take(10),
//   desc("grade")
// );
// console.log(getGradeTop10(data));
