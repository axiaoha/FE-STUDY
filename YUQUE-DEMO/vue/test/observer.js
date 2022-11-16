const val = {
  a: {
    b: 1,
    c: {
      d: 2,
      e: 3,
    },
  },
};

// Object.keys(val).forEach((key) => {
//   let data = val[key];
//   Object.defineProperty(val, key, {
//     get() {
//       console.log("get");
//       return data;
//     },
//     set(newValue) {
//       console.log("set");
//       data = newValue;
//     },
//   });
// });

let data = val.a;
let data2 = val.a.c;
Object.defineProperty(val, "a", {
  get() {
    console.log("get a");
    return data;
  },
  set(newValue) {
    console.log("set a");
    data = newValue;
  },
});
Object.defineProperty(val.a, "c", {
  get() {
    console.log("get c");
    return data2;
  },
  set(newValue) {
    console.log("set c");
    data2 = newValue;
  },
});
