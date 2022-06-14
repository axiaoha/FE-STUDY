var obj = {
  b: 123,
  c: "456",
  e: "789",
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`; // 'a123aa456aa {a.d}aaaa'

function parseStr(str, obj) {
  let start = 0;
  let flag = false;
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      flag = true;
      start = i + 1;
    }
    if (!flag) res += str[i];
    if (str[i] === "}") {
      flag = false;
      res += match(str.slice(start, i), obj);
    }
  }
  return res;
}
function match(str, obj) {
  let keys = str.split(".").slice(1);
  console.log("keys", keys);
  let o = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!o[keys[i]]) {
      return `{${str}}`;
    } else {
      o = o[keys[i]];
    }
  }
  console.log("o", o);
  return o;
}

console.log(parseStr(str, obj));
