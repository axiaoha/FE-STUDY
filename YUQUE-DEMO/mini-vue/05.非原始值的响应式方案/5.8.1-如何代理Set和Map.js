const reactiveMap = new Map();

const p = reactive(new Set([1, 2, 3]));
console.log(p.size); // 3
// 调用 delete 方法删除值为 1 的元素，正确执行
p.delete(1);

// 避免了为同一个原始对象多次创建代理对象的问题
function reactive(obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj);
  if (existionProxy) return existionProxy;

  // 否则，创建新的代理对象
  const proxy = createReactive(obj);
  // 存储到 Map 中，从而避免重复创建
  reactiveMap.set(obj, proxy);
  return proxy;
}

// 在 createReactive 里封装用于代理 Set/Map 类型数据的逻辑
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === "size") {
        return Reflect.get(target, key, target);
      }
      return target[key].bind(target);
    },
  });
}
