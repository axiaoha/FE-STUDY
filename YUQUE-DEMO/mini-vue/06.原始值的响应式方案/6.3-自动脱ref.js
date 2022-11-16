// 用一个全局变量存储被注册的副作用函数
let activeEffect;
const effectStack = [];
const bucket = new WeakMap();
const ITERATE_KEY = Symbol();
// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map();
// 一个标记变量，代表是否进行追踪。默认值为 true，即允许追踪
let shouldTrack = true;
// 抽离为独立的函数，便于复用
function iterationMethod() {
  // 获取原始数据对象 target
  const target = this.raw;
  // 获取原始迭代器方法
  const itr = target[Symbol.iterator]();

  const wrap = (val) =>
    typeof val === "object" && val !== null ? reactive(val) : val;

  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY);

  // 返回自定义的迭代器
  return {
    // 迭代器协议
    next() {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();
      return {
        // 如果 value 不是 undefined，则对其进行包裹
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done,
      };
    },
    // 实现可迭代协议
    [Symbol.iterator]() {
      return this;
    },
  };
}
function valuesIterationMethod() {
  // 获取原始数据对象 target
  const target = this.raw;
  // 通过 target.values 获取原始迭代器方法
  const itr = target.values();
  const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
  track(target, ITERATE_KEY);
  // 将其返回
  return {
    next() {
      const { value, done } = itr.next();
      return {
        // value 是值，而非键值对，所以只需要包裹 value 即可
        value: wrap(value),
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
const MAP_KEY_ITERATE_KEY = Symbol();
function keysIterationMethod() {
  // 获取原始数据对象 target
  const target = this.raw;
  // 获取原始迭代器方法
  const itr = target.keys();
  const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
  // 调用 track 函数追踪依赖，在副作用函数与 MAP_KEY_ITERATE_KEY 之间建立响应联系
  track(target, MAP_KEY_ITERATE_KEY);
  // 将其返回
  return {
    next() {
      const { value, done } = itr.next();
      return {
        value: wrap(value),
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
// 定义一个对象，将自定义的 add 方法定义到该对象下
const mutableInstrumentations = {
  // 共用 iterationMethod 方法
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod,
  values: valuesIterationMethod,
  keys: keysIterationMethod,
  // 接收第二个参数
  forEach(callback, thisArg) {
    const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
    const target = this.raw;
    track(target, ITERATE_KEY);

    target.forEach((v, k) => {
      // 通过 .call 调用 callback，并传递 thisArg
      callback.call(thisArg, wrap(v), wrap(k), this);
    });
  },
  get(key) {
    // 获取原始对象
    const target = this.raw;
    // 判断读取的 key 是否存在
    const had = target.has(key);
    // 追踪依赖，建立响应联系
    track(target, key);
    // 如果存在，则返回结果。这里要注意的是，如果得到的结果 res 仍然是可代理的数据，
    // 则要返回使用 reactive 包装后的响应式数据
    if (had) {
      const res = target.get(key);
      return typeof res === "object" ? reactive(res) : res;
    }
  },
  set(key, value) {
    const target = this.raw;
    const had = target.has(key);
    // 获取旧值
    const oldValue = target.get(key);
    // 获取原始数据，由于 value 本身可能已经是原始数据，所以此时 value.raw 不存在，则直接使用 value
    const rawValue = value.raw || value;
    // 设置新值
    target.set(key, rawValue);
    // 如果不存在，则说明是 ADD 类型的操作，意味着新增
    if (!had) {
      trigger(target, key, "ADD");
    } else if (
      oldValue !== value ||
      (oldValue === oldValue && value === value)
    ) {
      // 如果不存在，并且值变了，则是 SET 类型的操作，意味着修改
      trigger(target, key, "SET");
    }
  },
  add(key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 先判断值是否已经存在
    const hadKey = target.has(key);
    // 通过原始数据对象执行 add 方法添加具体的值，
    // 注意，这里不再需要 .bind 了，因为是直接通过 target 调用并执行的
    const res = target.add(key);
    // 调用 trigger 函数触发响应，并指定操作类型为 ADD
    // 只有在值不存在的情况下，才需要触发响应
    if (!hadKey) {
      trigger(target, key, "ADD");
    }
    // 返回操作结果
    return res;
  },
  delete(key) {
    const target = this.raw;
    const hadKey = target.has(key);
    const res = target.delete(key);
    // 当要删除的元素确实存在时，才触发响应
    if (hadKey) {
      trigger(target, key, "DELETE");
    }
    return res;
  },
};

// 用例：
// obj 是响应式数据
const obj = reactive({ foo: 1, bar: 2 });
// 将响应式数据展开到一个新的对象 newObj
const newObj1 = proxyRefs({
  ...toRefs(obj),
});
// const newObj2 = proxyRefs({
//   foo: toRef(obj, "foo"),
//   bar: toRef(obj, "bar"),
// });
effect(() => {
  // 在副作用函数内通过新的对象 newObj 读取 foo 属性值
  console.log(newObj1.foo);
  // console.log(newObj2.foo.value);
});
// 很显然，此时修改 obj.foo 并不会触发响应
// obj.foo = 100;
newObj1.foo = 101;

function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key];
    },
    // 允许设置值
    set value(val) {
      obj[key] = val;
    },
  };

  Object.defineProperty(wrapper, "__v_isRef", {
    value: true,
  });

  return wrapper;
}

function toRefs(obj) {
  const ret = {};
  // 使用 for...in 循环遍历对象
  for (const key in obj) {
    // 逐个调用 toRef 完成转换
    ret[key] = toRef(obj, key);
  }
  return ret;
}

function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      return value.__v_isRef ? value.value : value;
    },
    set(target, key, newValue, receiver) {
      // 通过 target 读取真实值
      const value = target[key];
      // 如果值是 Ref，则设置其对应的 value 属性值
      if (value.__v_isRef) {
        value.value = newValue;
        return true;
      }
      return Reflect.set(target, key, newValue, receiver);
    },
  });
}

// 封装一个 ref 函数
function ref(val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val,
  };
  // 使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举的属性 __v_isRef，并且值为 true
  Object.defineProperty(wrapper, "__v_isRef", {
    value: true,
  });
  // 将包裹对象变成响应式数据
  return reactive(wrapper);
}

function shallowReadonly(obj) {
  return createReactive(obj, true /* shallow */, true);
}

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

function shallowReactive(obj) {
  return createReactive(obj, true);
}

// 封装 createReactive 函数，接收一个参数 isShallow，代表是否为浅响应，默认为 false，即非浅响应
// isReadonly，代表是否只读，默认为 false，即非只读
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    // 拦截访问属性读取操作
    get(target, key, receiver) {
      // 如果读取的是 raw 属性，则返回原始数据对象 target
      if (key === "raw") return target;
      if (key === "size") {
        // 调用 track 函数建立响应联系
        track(target, ITERATE_KEY);
        return Reflect.get(target, key, target);
      }
      if (mutableInstrumentations.hasOwnProperty(key)) {
        // 返回定义在 mutableInstrumentations 对象下的方法
        return mutableInstrumentations[key];
      }
      // 非只读的时候才需要建立响应联系
      // 如果 key 的类型是 symbol，则不进行追踪
      if (!isReadonly && typeof key !== "symbol") {
        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
        track(target, key);
      }
      const res = Reflect.get(target, key, receiver);
      // 如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res;
      }
      // 得到原始值结果
      if (typeof res === "object" && res !== null) {
        // 调用 reactive 将结果包装成响应式数据并返回
        // 如果数据为只读，则调用 readonly 对值进行包装
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    },
    // 拦截 in 操作符读取操作
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    // 拦截 for...in 循环
    ownKeys(target) {
      // 将副作用函数与 ITERATE_KEY 关联
      // 如果操作目标 target 是数组，则使用 length 属性作为 key 并建立响应联系
      track(target, Array.isArray(target) ? "length" : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty(target, key) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      // 检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      // 使用 Reflect.deleteProperty 完成属性的删除
      const res = Reflect.deleteProperty(target, key);

      if (res && hadKey) {
        // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
        trigger(target, key, "DELETE");
      }

      return res;
    },
    // 拦截设置操作
    set(target, key, newVal, receiver) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      // 先获取旧值
      const oldVal = target[key];
      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      const type = Array.isArray(target)
        ? // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，
          // 如果是，则视作 SET 操作，否则是 ADD 操作
          Number(key) < target.length
          ? "SET"
          : "ADD"
        : Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";

      // 设置属性值
      const res = Reflect.set(target, key, newVal, receiver);

      // target === receiver.raw 说明 receiver 就是 target 的代理对象
      if (target === receiver.raw) {
        // 比较新值与旧值，只有当它们不全等，并且不都是 NaN 的时候才触发响应
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 把副作用函数从桶里取出并执行
          trigger(target, key, type, newVal);
        }
      }
      return res;
    },
  });
}

// watch 函数接收两个参数，source 是响应式数据，cb 是回调函数
function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
  // 定义旧值与新值
  let oldValue, newValue;
  // cleanup 用来存储用户注册的过期回调
  let cleanup;
  // 定义 onInvalidate 函数
  function onInvalidate(fn) {
    // 将过期回调存储到 cleanup 中
    cleanup = fn;
  }

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    // 在 scheduler 中重新执行副作用函数，得到的是新值
    newValue = effectFn();

    // 在调用回调函数 cb 之前，先调用过期回调
    if (cleanup) {
      cleanup();
    }

    // 将旧值和新值作为回调函数的参数
    // 将 onInvalidate 作为回调函数的第三个参数，以便用户使用
    cb(newValue, oldValue, onInvalidate);
    // 更新旧值，不然下一次会得到错误的旧值
    oldValue = newValue;
  };

  // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn 中以便后续手动调用
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      // 在调度函数中判断 flush 是否为 'post'，如果是，将其放到微任务队列中执行
      if (options.flush === "post") {
        const p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    },
  });
  if (options.immediate) {
    // 当 immediate 为 true 时立即执行 job，从而触发回调执行
    job();
  } else {
    // 手动调用副作用函数，拿到的值就是旧值
    oldValue = effectFn();
  }
}

function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== "object" || value === null || seen.has(value)) return;
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value);
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function computed(getter) {
  // value 用来缓存上一次计算的值
  let value;
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true;

  const effectFn = effect(getter, {
    lazy: true,
    // 添加调度器，在调度器中将 dirty 重置为 true
    scheduler() {
      if (!dirty) {
        dirty = true;
        // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
        trigger(obj, "value");
      }
    },
  });

  const obj = {
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn();
        // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
        dirty = false;
      }
      // 当读取 value 时，手动调用 track 函数进行追踪
      track(obj, "value");
      return value;
    },
  };

  return obj;
}

function effect(fn, options = {}) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 将 fn 的执行结果存储到 res 中
    const res = fn();
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    // 将 res 作为 effectFn 的返回值
    return res;
  };
  // 将 options 挂载到 effectFn 上
  effectFn.options = options;
  effectFn.deps = [];
  // 只有非 lazy 的时候，才执行
  if (!options.lazy) {
    // 执行副作用函数
    effectFn();
  }
  // 将副作用函数作为返回值返回
  return effectFn;
}

function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect || !shouldTrack) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  // 把当前激活的副作用函数添加到依赖集合 deps 中
  deps.add(activeEffect);
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}

function trigger(target, key, type, newVal) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  // 取得与 key 相关联的副作用函数
  const effects = depsMap.get(key);

  const effectsToRun = new Set();
  effects &&
    effects.forEach((effectFn) => {
      // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });

  // 只有当操作类型为 'ADD' 时，才触发与 ITERATE_KEY 相关联的副作用函数重新执行
  if (
    ["ADD", "DELETE"].includes(type) ||
    // 如果操作类型是 SET，并且目标对象是 Map 类型的数据，
    // 也应该触发那些与 ITERATE_KEY 相关联的副作用函数重新执行
    (type === "SET" &&
      Object.prototype.toString.call(target) === "[object Map]")
  ) {
    // 取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  if (
    // 操作类型为 ADD 或 DELETE
    (type === "ADD" || type === "DELETE") &&
    // 并且是 Map 类型的数据
    Object.prototype.toString.call(target) === "[object Map]"
  ) {
    // 则取出那些与 MAP_KEY_ITERATE_KEY 相关联的副作用函数并执行
    const iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  // 当操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length 属性相关联的副作用函数
  if (type === "ADD" && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get("length");
    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  // 如果操作目标是数组，并且修改了数组的 length 属性
  if (Array.isArray(target) && key === "length") {
    // 对于索引大于或等于新的 length 值的元素，
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 中待执行
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach((effectFn) => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }

  effectsToRun.forEach((effectFn) => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      effectFn();
    }
  });
  // effects && effects.forEach(effectFn => effectFn())
}

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0;
}
