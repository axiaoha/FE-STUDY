function shouldSetAsProps(el, key, value) {
  // 特殊处理
  if (key === "form" && el.tagName === "INPUT") return false;
  // 兜底
  return key in el;
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = ((u + v) / 2) | 0;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
// resolveProps 函数用于解析组件 props 和 attrs 数据
function resolveProps(options = {}, propsData = {}) {
  const props = {};
  const attrs = {};
  // 遍历为组件传递的 props 数据
  for (const key in propsData) {
    if (key in options || key.startsWith("on")) {
      // 如果为组件传递的 props 数据在组件自身的 props 选项中有定义，则将其视为合法的 props
      // 以字符串 on 开头的 props，无论是否显式地声明，都将其添加到 props 数据中，而不是添加到 attrs 中
      props[key] = propsData[key];
    } else {
      // 否则将其作为 attrs
      attrs[key] = propsData[key];
    }
  }
  // 最后返回 props 与 attrs 数据
  return [props, attrs];
}
function hasPropsChanged(prevProps = {}, nextProps = {}) {
  const nextKeys = Object.keys(nextProps);
  // 如果新旧 props 的数量变了，则说明有变化
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  // 只有
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    // 有不相等的 props，则说明有变化
    if (nextProps[key] !== prevProps[key]) return true;
  }
  return false;
}
// 全局变量，存储当前正在被初始化的组件实例
let currentInstance = null;
// 该方法接收组件实例作为参数，并将该实例设置为 currentInstance
function setCurrentInstance(instance) {
  currentInstance = instance;
}
function onMounted(fn) {
  if (currentInstance) {
    // 将生命周期函数添加到 instance.mounted 数组中
    currentInstance.mounted.push(fn);
  } else {
    console.error("onMounted 函数只能在 setup 中调用");
  }
}
function onUmounted(fn) {
  if (currentInstance) {
    // 将生命周期函数添加到 instance.mounted 数组中
    currentInstance.umounted.push(fn);
  } else {
    console.error("onUmounted 函数只能在 setup 中调用");
  }
}
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 可以是配置项，也可以是加载器
  if (typeof options === "function") {
    // 如果 options 是加载器，则将其格式化为配置项形式
    options = {
      loader: options,
    };
  }
  const { loader } = options;

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null;
  // 记录重试次数
  let retries = 0;
  // 封装 load 函数用来加载异步组件
  function load() {
    return (
      loader()
        // 捕获加载器的错误
        .catch((err) => {
          // 如果用户指定了 onError 回调，则将控制权交给用户
          if (options.onError) {
            // 返回一个新的 Promise 实例
            return new Promise((resolve, reject) => {
              // 重试
              const retry = () => {
                const res = load();
                resolve(res);
                retries++;
              };
              // 失败
              const fail = () => reject(err);
              // 作为 onError 回调函数的参数，让用户来决定下一步怎么做
              options.onError(retry, fail, retries);
            });
          } else {
            throw err;
          }
        })
    );
  }

  // 返回一个包装组件
  return {
    name: "AsyncComponentWrapper",
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false);
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null);
      // 一个标志，代表是否正在加载，默认为 false
      const loading = ref(false);

      let loadingTimer = null;
      // 如果配置项中存在 delay，则开启一个定时器计时，当延迟到时后将 loading.value 设置为 true
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true;
        }, options.delay);
      } else {
        // 如果配置项中没有 delay，则直接标记为加载中
        loading.value = true;
      }

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      // 调用 load 函数加载组件
      load()
        .then((c) => {
          InnerComp = c.default;
          loaded.value = true;
        }) // 添加 catch 语句来捕获加载过程中的错误
        .catch((err) => (error.value = err))
        .finally(() => {
          loading.value = false;
          // // 加载完毕后，无论成功与否都要清除延迟定时器
          // clearTimeout(loadingTimer);
        });

      let timer = null;
      if (options.timeout) {
        // 如果指定了超时时长，则开启一个定时器计时
        timer = setTimeout(() => {
          // 超时后创建一个错误对象，并复制给 error.value
          const err = new Error(
            `Async component timed out after ${options.timeout}ms.`
          );
          error.value = err;
          // 超时后将 timeout 设置为 true
        }, options.timeout);
      }
      // 包装组件被卸载时清除定时器
      onUmounted(() => {
        clearTimeout(timer);
      });
      // 占位内容
      const placeholder = { type: Text, children: "占位内容" };
      return () => {
        if (loaded.value) {
          // 如果组件异步加载成功，则渲染被加载的组件
          return { type: InnerComp };
        } else if (error.value && options.errorComponent) {
          console.log("error.value", error.value);
          // 如果加载超时，并且用户指定了 Error 组件，则渲染该组件
          return {
            type: options.errorComponent,
            props: { error: error.value },
          };
        } else if (loading.value && options.loadingComponent) {
          // 如果异步组件正在加载，并且用户指定了 Loading 组件，则渲染 Loading 组件
          return { type: options.loadingComponent };
        }
        return placeholder;
      };
    },
  };
}

// 创建一个渲染器
// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag);
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text;
  },
  // 用于在给定的 parent 下添加指定元素
  // 如果 anchor 为 null 则 newNode 将被插入到子节点的末尾*。*
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setText(el, text) {
    el.nodeValue = text;
  },
  // 将属性设置相关操作封装到 patchProps 函数中，并作为渲染器选项传递
  patchProps(el, key, prevValue, nextValue) {
    if (/^on/.test(key)) {
      const invokers = el._vei || (el._vei = {});
      let invoker = invokers[key];
      const name = key.slice(2).toLowerCase();
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[key] = (e) => {
            // e.timeStamp 是事件发生的时间
            // 如果事件发生的时间早于事件处理函数绑定的时间，则不执行事件处理函数
            if (e.timeStamp < invoker.attached) return;
            // 如果 invoker.value 是数组，则遍历它并逐个调用事件处理函数
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach((fn) => fn(e));
            } else {
              // 否则直接作为函数调用
              invoker.value(e);
            }
          };
          invoker.value = nextValue;
          // 添加 invoker.attached 属性，存储事件处理函数被绑定的时间
          invoker.attached = performance.now();
          el.addEventListener(name, invoker);
        } else {
          invoker.value = nextValue;
        }
      }
    }
    // 对 class 进行特殊处理
    // 使用 setAttribute、el.className 或 el.classList，
    // 其中 el.className 性能最好
    else if (key === "class") {
      el.className = nextValue || "";
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];
      if (type === "boolean" && nextValue === "") {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      el.setAttribute(key, nextValue);
    }
  },
});

// 文本节点的 type 标识
const Text = Symbol();
// 注释节点的 type 标识
const Comment = Symbol();
const Fragment = Symbol();
const {
  effect,
  reactive,
  shallowReactive,
  ref,
  shallowRef,
  shallowReadonly,
  proxyRefs,
} = VueReactivity;

// 用来描述组件的 VNode 对象，type 属性值为组件的选项对象
const CompVNode = {
  type: defineAsyncComponent({
    loader: () => import("./AsyncComp.js"),
    timeout: 2000, // 超时时长，其单位为 ms
    errorComponent: {
      props: {
        error: String,
      },
      setup(props, { emit }) {
        return () => {
          return {
            type: Text,
            children: `${props.error}`,
          };
        };
      },
    }, // 指定出错时要渲染的组件
    // 延迟 200ms 展示 Loading 组件
    delay: 200,
    // Loading 组件
    loadingComponent: {
      setup() {
        return () => {
          return { type: "h2", children: "Loading..." };
        };
      },
    },
    onError(retry, fail, retries) {
      console.log("retries", retries);
      if (retries > 10) {
        fail();
      } else {
        retry();
      }
    },
  }),
};
// 调用渲染器来渲染组件
renderer.render(CompVNode, document.querySelector("#app"));

// 任务缓存队列，用一个 Set 数据结构来表示，这样就可以自动对任务进行去重
const queue = new Set();
// 一个标志，代表是否正在刷新任务队列
let isFlushing = false;
// 创建一个立即 resolve 的 Promise 实例
const p = Promise.resolve();
// 调度器的主要函数，用来将一个任务添加到缓冲队列中，并开始刷新队列
function queueJob(job) {
  // 将 job 添加到任务队列 queue 中
  queue.add(job);
  // 如果还没有开始刷新队列，则刷新之
  if (!isFlushing) {
    // 将该标志设置为 true 以避免重复刷新
    isFlushing = true;
    // 在微任务中刷新缓冲队列
    p.then(() => {
      try {
        // 执行任务队列中的任务
        queue.forEach((job) => job());
      } finally {
        // 重置状态
        isFlushing = false;
        queue.clear = 0;
      }
    });
  }
}

function createRenderer(options) {
  // 通过 options 得到操作 DOM 的 API
  const {
    createElement,
    insert,
    setElementText,
    patchProps,
    createText,
    setText,
  } = options;
  // patch 函数需要接收第四个参数，即锚点元素
  function patch(n1, n2, container, anchor) {
    // 如果 n1 存在，则对比 n1 和 n2 的类型
    if (n1 && n1.type !== n2.type) {
      // 如果新旧 vnode 的类型不同，则直接将旧 vnode 卸载
      unmount(n1);
      n1 = null;
    }
    // 代码运行到这里，证明 n1 和 n2 所描述的内容相同
    const { type } = n2;
    // 如果 n2.type 的值是字符串类型，则它描述的是普通标签元素
    if (typeof type === "string") {
      // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
      if (!n1) {
        // 挂载时将锚点元素作为第三个参数传递给 mountElement 函数
        mountElement(n2, container, anchor);
      } else {
        // n1 存在，意味着打补丁
        patchElement(n1, n2);
      }
    } else if (type === "xxx") {
      // 处理其他类型的 vnode
    } else if (type === Text) {
      // 如果新 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
      // 如果没有旧节点，则进行挂载
      if (!n1) {
        // 使用 createTextNode 创建文本节点
        const el = (n2.el = createText(n2.children));
        // 将文本节点插入到容器中
        insert(el, container);
      } else {
        // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
        const el = (n2.el = n1.el);
        if (n2.children !== n1.children) {
          setText(el, n2.children);
        }
      }
    } else if (type === Fragment) {
      // 处理 Fragment 类型的 vnode
      if (!n1) {
        // 如果旧 vnode 不存在，则只需要将 Fragment 的 children 逐个挂载即可
        n2.children.forEach((c) => patch(null, c, container));
      } else {
        // 如果旧 vnode 存在，则只需要更新 Fragment 的 children 即可
        patchChildren(n1, n2, container);
      }
    } else if (typeof type === "object") {
      // 如果 n2.type 的值的类型是对象，则它描述的是组件
      // vnode.type 的值是选项对象，作为组件来处理
      if (!n1) {
        // 挂载组件
        mountComponent(n2, container, anchor);
      } else {
        // 更新组件
        patchComponent(n1, n2, anchor);
      }
    }
  }
  function mountComponent(vnode, container, anchor) {
    // 通过 vnode 获取组件的选项对象，即 vnode.type
    const componentOptions = vnode.type;
    // 获取组件的渲染函数 render
    let {
      render,
      data,
      beforeCreate,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      // 从组件选项对象中取出 props 定义，即 propsOption
      props: propsOption,
      setup,
    } = componentOptions;

    // 在这里调用 beforeCreate 钩子
    beforeCreate && beforeCreate();

    // 调用 data 函数得到原始数据，并调用 reactive 函数将其包装为响应式数据
    const state = data ? reactive(data()) : null;
    // 调用 resolveProps 函数解析出最终的 props 数据与 attrs 数据
    const [props, attrs] = resolveProps(propsOption, vnode.props);
    // 直接使用编译好的 vnode.children 对象作为 slots 对象即可
    const slots = vnode.children || {};

    // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
    const instance = {
      // 组件自身的状态数据，即 data
      state,
      // 将解析出的 props 数据包装为 shallowReactive 并定义到组件实例上
      props: shallowReactive(props),
      // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
      isMounted: false,
      // 组件所渲染的内容，即子树（subTree）
      subTree: null,
      // 将插槽添加到组件实例上
      slots,
      // 在组件实例中添加 mounted 数组，用来存储通过 onMounted 函数注册的生命周期钩子函数
      mounted: mounted || [],
      umounted: [],
    };

    // 定义 emit 函数，它接收两个参数
    // event: 事件名称
    // payload: 传递给事件处理函数的参数
    function emit(event, ...payload) {
      // 根据约定对事件名称进行处理，例如 change --> onChange
      const eventName = `on${event[0].toUpperCase() + event.slice(1)}`;
      // 根据处理后的事件名称去 props 中寻找对应的事件处理函数
      const handler = instance.props[eventName];
      if (handler) {
        // 调用事件处理函数并传递参数
        handler(...payload);
      } else {
        console.error("事件不存在");
      }
    }

    // setupContext
    const setupContext = { attrs, emit, slots };
    // 调用 setup 函数，将只读版本的 props 作为第一个参数传递，避免用户意外地修改 props 的值，
    // 在调用 setup 函数之前，设置当前组件实例
    setCurrentInstance(instance);
    // 将 setupContext 作为第二个参数传递
    const setupResult = setup(shallowReadonly(instance.props), setupContext);
    // 在 setup 函数执行完毕之后，重置当前组件实例
    setCurrentInstance(null);
    // setupState 用来存储由 setup 返回的数据
    let setupState = null;
    // 如果 setup 函数的返回值是函数，则将其作为渲染函数
    if (typeof setupResult === "function") {
      // 报告冲突
      if (render) console.error("setup 函数返回渲染函数，render 选项将被忽略");
      // 将 setupResult 作为渲染函数
      render = setupResult;
    } else {
      // 如果 setup 的返回值不是函数，则作为数据状态赋值给 setupState
      setupState = proxyRefs(setupResult);
    }

    // 将组件实例设置到 vnode 上，用于后续更新
    vnode.component = instance;

    // 创建渲染上下文对象，本质上是组件实例的代理
    const renderContext = new Proxy(instance, {
      get(t, k, r) {
        // 取得组件自身状态与 props 数据
        const { state, props, slots } = t;
        // 当 k 的值为 $slots 时，直接返回组件实例上的 slots
        if (k === "$slots") {
          return slots;
        } else if (state && k in state) {
          // 先尝试读取自身状态数据
          return state[k];
        } else if (k in props) {
          // 如果组件自身没有该数据，则尝试从 props 中读取
          return props[k];
        } else if (setupState && k in setupState) {
          // 渲染上下文需要增加对 setupState 的支持
          return setupState[k];
        } else {
          console.error("不存在");
        }
      },
      set(t, k, v, r) {
        const { state, props } = t;
        if (state && k in state) {
          state[k] = v;
        } else if (k in props) {
          console.warn(`Attempting to mutate prop "${k}". Props are readonly.`);
        } else if (setupState && k in setupState) {
          // 渲染上下文需要增加对 setupState 的支持
          setupState[k] = v;
        } else {
          console.error("不存在");
        }
      },
    });

    // 在这里调用 created 钩子
    // 生命周期函数调用时要绑定渲染上下文对象
    created && created.call(renderContext);

    // 将组件的 render 函数调用包装到 effect 内
    effect(
      () => {
        // 调用 render 函数时，将其 this 设置为 state，
        // 从而 render 函数内部可以通过 this 访问组件自身状态数据
        const subTree = render.call(renderContext, renderContext);
        // 检查组件是否已经被挂载
        if (!instance.isMounted) {
          // 在这里调用 beforeMount 钩子
          // beforeMount && beforeMount.call(renderContext);
          // 初次挂载，调用 patch 函数第一个参数传递 null
          patch(null, subTree, container, anchor);
          // 重点：将组件实例的 isMounted 设置为 true，这样当更新发生时就不会再次进行挂载操作，
          // 而是会执行更新
          instance.isMounted = true;
          // 在这里调用 mounted 钩子
          // 遍历 instance.mounted 数组并逐个执行即可
          instance.mounted &&
            instance.mounted.forEach((hook) => hook.call(renderContext));
          // mounted && mounted.call(renderContext);
        } else {
          // 在这里调用 beforeUpdate 钩子
          // beforeUpdate && beforeUpdate.call(renderContext);
          // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可，
          // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树，
          // 意思是，使用新的子树与上一次渲染的子树进行打补丁操作
          patch(instance.subTree, subTree, container, anchor);
          // 在这里调用 updated 钩子
          // updated && updated.call(renderContext);
        }
        // 更新组件实例的子树
        instance.subTree = subTree;
      },
      {
        // 指定该副作用函数的调度器为 queueJob 即可
        scheduler: queueJob,
      }
    );
  }
  function patchComponent(n1, n2, anchor) {
    // 获取组件实例，即 n1.component，同时让新的组件虚拟节点 n2.component 也指向组件实例
    const instance = (n2.component = n1.component);
    // 获取当前的 props 数据
    const { props } = instance;
    // 调用 hasPropsChanged 检测为子组件传递的 props 是否发生变化，如果没有变化，则不需要更新
    if (hasPropsChanged(n1.props, n2.props)) {
      // 调用 resolveProps 函数重新获取 props 数据
      const [nextProps] = resolveProps(n2.type.props, n2.props);
      // 更新 props
      for (const k in nextProps) {
        props[k] = nextProps[k];
      }
      // 删除不存在的 props
      for (const k in props) {
        if (!(k in nextProps)) delete props[k];
      }
    }
  }
  function patchElement(n1, n2) {
    // 新的 vnode 也引用了真实 DOM 元素
    // 真正含义其实就是 DOM 元素的复用
    const el = (n2.el = n1.el);
    const oldProps = n1.props;
    const newProps = n2.props;
    // 第一步：更新 props
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key]);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null);
      }
    }
    // 第二步：更新 children
    patchChildren(n1, n2, el);
  }
  function patchChildren(n1, n2, container) {
    // 判断新子节点的类型是否是文本节点
    if (typeof n2.children === "string") {
      // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
      // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况下什么都不需要做
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      }
      // 最后将新的文本节点内容设置给容器元素
      setElementText(container, n2.children);
    } else if (Array.isArray(n2.children)) {
      // 说明新子节点是一组子节点
      // 判断旧子节点是否也是一组子节点
      if (Array.isArray(n1.children)) {
        // 封装 patchKeyedChildren 函数处理两组子节点
        patchKeyedChildren(n1, n2, container);
      } else {
        // 此时：
        // 旧子节点要么是文本子节点，要么不存在
        // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
        setElementText(container, "");
        n2.children.forEach((c) => patch(null, c, container));
      }
    } else {
      // 代码运行到这里，说明新子节点不存在
      // 旧子节点是一组子节点，只需逐个卸载即可
      if (Array.isArray(n1.children)) {
        n1.children.forEach((c) => unmount(c));
      } else if (typeof n1.children === "string") {
        // 旧子节点是文本子节点，清空内容即可
        setElementText(container, "");
      }
      // 如果也没有旧子节点，那么什么都不需要做
    }
  }
  function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 处理相同的前置节点
    // 索引 j 指向新旧两组子节点的开头
    let j = 0;
    let oldVNode = oldChildren[j];
    let newVNode = newChildren[j];
    // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
    while (oldVNode && newVNode && oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container);
      // 更新索引 j，让其递增
      j++;
      oldVNode = oldChildren[j];
      newVNode = newChildren[j];
    }

    // 更新相同的后置节点
    // 索引 oldEnd 指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1;
    // 索引 newEnd 指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
    // while 循环从后向前遍历，直到遇到拥有不同 key 值的节点为止
    while (oldVNode && newVNode && oldVNode.key === newVNode.key) {
      // 调用 patch 函数进行更新
      patch(oldVNode, newVNode, container);
      // 递减 oldEnd 和 nextEnd
      oldEnd--;
      newEnd--;
      oldVNode = oldChildren[oldEnd];
      newVNode = newChildren[newEnd];
    }

    // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应作为新节点插入
    if (j > oldEnd && j <= newEnd) {
      // 锚点的索引
      const anchorIndex = newEnd + 1;
      // 锚点元素
      const anchor =
        anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
      // 采用 while 循环，调用 patch 函数逐个挂载新增节点
      while (j <= newEnd) {
        patch(null, newChildren[j++], container, anchor);
      }
    } else if (j > newEnd && j <= oldEnd) {
      // j -> oldEnd 之间的节点应该被卸载
      while (j <= oldEnd) {
        unmount(oldChildren[j++]);
      }
    } else {
      // 构造 source 数组
      // 新的一组子节点中剩余未处理节点的数量
      const count = newEnd - j + 1;
      const source = new Array(count);
      source.fill(-1);

      // oldStart 和 newStart 分别为起始索引，即 j
      const oldStart = j;
      const newStart = j;
      // 新增两个变量，moved 和 pos
      let moved = false;
      let pos = 0;

      // 构建索引表
      const keyIndex = {};
      for (let i = newStart; i <= newEnd; i++) {
        keyIndex[newChildren[i].key] = i;
      }
      // 新增 patched 变量，代表更新过的节点数量
      let patched = 0;
      // 遍历旧的一组子节点中剩余未处理的节点
      for (let i = oldStart; i <= oldEnd; i++) {
        oldVNode = oldChildren[i];
        // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
        if (patched <= count) {
          // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
          const k = keyIndex[oldVNode.key];

          if (typeof k !== "undefined") {
            newVNode = newChildren[k];
            // 调用 patch 函数完成更新
            patch(oldVNode, newVNode, container);
            // 填充 source 数组
            source[k - newStart] = i;
            // 判断节点是否需要移动
            if (k < pos) {
              moved = true;
            } else {
              pos = k;
            }
          } else {
            // 没找到
            unmount(oldVNode);
          }
        } else {
          // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
          unmount(oldVNode);
        }
      }

      // 如果 moved 为真，则需要进行 DOM 移动操作
      if (moved) {
        // 计算最长递增子序列
        const seq = getSequence(source); // [ 0, 1 ]

        // s 指向最长递增子序列的最后一个元素
        let s = seq.length - 1;
        // i 指向新的一组子节点的最后一个元素
        let i = count - 1;
        // for 循环使得 i 递减，即按照图 11-24 中箭头的方向移动
        for (i; i >= 0; i--) {
          if (source[i] === -1) {
            // 说明索引为 i 的节点是全新的节点，应该将其挂载
            // 该节点在新 children 中的真实位置索引
            const pos = i + newStart;
            const newVNode = newChildren[pos];
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1;
            // 锚点
            const anchor =
              nextPos < newChildren.length ? newChildren[nextPos].el : null;
            // 挂载
            patch(null, newVNode, container, anchor);
          } else if (i !== seq[s]) {
            // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
            // 该节点在新的一组子节点中的真实位置索引
            const pos = i + newStart;
            const newVNode = newChildren[pos];
            // 该节点的下一个节点的位置索引
            const nextPos = pos + 1;
            // 锚点
            const anchor =
              nextPos < newChildren.length ? newChildren[nextPos].el : null;
            // 移动
            insert(newVNode.el, container, anchor);
          } else {
            // 当 i === seq[s] 时，说明该位置的节点不需要移动
            // 只需要让 s 指向下一个位置
            s--;
          }
        }
      }
    }
  }
  function mountElement(vnode, container, anchor) {
    // 调用 createElement 函数创建元素
    // 让 vnode.el 引用真实 DOM 元素
    const el = (vnode.el = createElement(vnode.type));
    if (typeof vnode.children === "string") {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children);
    } else if (Array.isArray(vnode.children)) {
      // 如果 children 是数组，则遍历每一个子节点，并调用 patch 函数挂载它们
      vnode.children.forEach((child) => {
        patch(null, child, el);
      });
    }
    if (vnode.props) {
      for (const key in vnode.props) {
        // 调用 patchProps 函数即可
        patchProps(el, key, null, vnode.props[key]);
      }
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container, anchor);
  }
  function unmount(vnode) {
    // 在卸载时，如果卸载的 vnode 类型为 Fragment，则需要卸载其 children
    if (vnode.type === Fragment) {
      vnode.children.forEach((c) => unmount(c));
      return;
    } else if (typeof vnode.type === "object") {
      // 对于组件的卸载，本质上是要卸载组件所渲染的内容，即 subTree
      unmount(vnode.component.subTree);
      vnode.component.umounted &&
        vnode.component.umounted.forEach((hook) => hook());
      return;
    }
    // 根据 vnode 获取要卸载的真实 DOM 元素的父元素
    const parent = vnode.el.parentNode;
    if (parent) {
      parent.removeChild(vnode.el);
    }
  }
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 调用 unmount 函数卸载 vnode
        unmount(container._vnode);
      }
    }
    container._vnode = vnode;
  }
  return {
    render,
  };
}
