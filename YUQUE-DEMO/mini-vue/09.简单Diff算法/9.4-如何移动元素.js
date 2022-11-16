function shouldSetAsProps(el, key, value) {
  // 特殊处理
  if (key === "form" && el.tagName === "INPUT") return false;
  // 兜底
  return key in el;
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

const oldVNode = {
  type: "div",
  children: [
    { type: "p", children: "1", key: 1 },
    { type: "p", children: "2", key: 2 },
    { type: "p", children: "hello", key: 3 },
  ],
};

const newVNode = {
  type: "div",
  children: [
    { type: "p", children: "world", key: 3 },
    { type: "p", children: "1", key: 1 },
    { type: "p", children: "2", key: 2 },
  ],
};

// 首次挂载
renderer.render(oldVNode, document.querySelector("#app"));
setTimeout(() => {
  // 1 秒钟后更新
  renderer.render(newVNode, document.querySelector("#app"));
}, 1000);

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
  function patch(n1, n2, container) {
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
        mountElement(n2, container);
      } else {
        // n1 存在，意味着打补丁
        patchElement(n1, n2);
      }
    } else if (typeof type === "object") {
      // 如果 n2.type 的值的类型是对象，则它描述的是组件
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
        const oldChildren = n1.children;
        const newChildren = n2.children;

        // 用来存储寻找过程中遇到的最大索引值
        let lastIndex = 0;
        for (let i = 0; i < newChildren.length; i++) {
          const newVNode = newChildren[i];
          for (let j = 0; j < oldChildren.length; j++) {
            const oldVNode = oldChildren[j];
            if (newVNode.key === oldVNode.key) {
              patch(oldVNode, newVNode, container);
              if (j < lastIndex) {
                // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex，
                // 说明该节点对应的真实 DOM 需要移动
                // 代码运行到这里，说明 newVNode 对应的真实 DOM 需要移动
                // 先获取 newVNode 的前一个 vnode，即 prevVNode
                const prevVNode = newChildren[i - 1];
                // 如果 prevVNode 不存在，则说明当前 newVNode 是第一个节点，它不需要移动
                if (prevVNode) {
                  // 由于我们要将 newVNode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面，
                  // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
                  const anchor = prevVNode.el.nextSibling;
                  // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面，
                  // 也就是 prevVNode 对应真实 DOM 的后面
                  insert(newVNode.el, container, anchor);
                }
              } else {
                // 如果当前找到的节点在旧 children 中的索引不小于最大索引值，
                // 则更新 lastIndex 的值
                lastIndex = j;
              }
              break; // 这里需要 break
            }
          }
        }
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
  function mountElement(vnode, container) {
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
    insert(el, container);
  }
  function unmount(vnode) {
    // 在卸载时，如果卸载的 vnode 类型为 Fragment，则需要卸载其 children
    if (vnode.type === Fragment) {
      vnode.children.forEach((c) => unmount(c));
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
