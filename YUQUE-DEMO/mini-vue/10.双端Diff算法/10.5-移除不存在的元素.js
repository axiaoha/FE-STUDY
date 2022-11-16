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

const oldVNode = {
  type: "div",
  children: [
    { type: "p", children: "1", key: 1 },
    { type: "p", children: "2", key: 2 },
    { type: "p", children: "3", key: 3 },
  ],
};
const newVNode = {
  type: "div",
  children: [
    { type: "p", children: "2", key: 2 },
    { type: "p", children: "3", key: 3 },
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
    // 四个索引值
    let oldStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newStartIdx = 0;
    let newEndIdx = newChildren.length - 1;
    // 四个索引指向的 vnode 节点
    let oldStartVNode = oldChildren[oldStartIdx];
    let oldEndVNode = oldChildren[oldEndIdx];
    let newStartVNode = newChildren[newStartIdx];
    let newEndVNode = newChildren[newEndIdx];
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // 增加两个判断分支，如果头尾部节点为 undefined，则说明该节点已经被处理过了，直接跳到下一个位置
      if (!oldStartVNode) {
        oldStartVNode = oldChildren[++oldStartIdx];
      } else if (!oldEndVNode) {
        oldEndVNode = oldChildren[--oldEndIdx];
      } else if (oldStartVNode.key === newStartVNode.key) {
        // 第一步：oldStartVNode 和 newStartVNode 比较
        // 调用 patch 函数在 oldStartVNode 与 newStartVNode 之间打补丁
        patch(oldStartVNode, newStartVNode, container);
        // 更新相关索引，指向下一个位置
        oldStartVNode = oldChildren[++oldStartIdx];
        newStartVNode = newChildren[++newStartIdx];
      } else if (oldEndVNode.key === newEndVNode.key) {
        // 第二步：oldEndVNode 和 newEndVNode 比较
        // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需打补丁
        patch(oldEndVNode, newEndVNode, container);
        // 更新索引和头尾部节点变量
        oldEndVNode = oldChildren[--oldEndIdx];
        newEndVNode = newChildren[--newEndIdx];
      } else if (oldStartVNode.key === newEndVNode.key) {
        // 第三步：oldStartVNode 和 newEndVNode 比较
        // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
        patch(oldStartVNode, newEndVNode, container);
        // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
        // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
        insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling);
        // 更新相关索引到下一个位置
        oldStartVNode = oldChildren[++oldStartIdx];
        newEndVNode = newChildren[--newEndIdx];
      } else if (oldEndVNode.key === newStartVNode.key) {
        // 第四步：oldEndVNode 和 newStartVNode 比较
        // 仍然需要调用 patch 函数进行打补丁
        patch(oldEndVNode, newStartVNode, container);
        // 移动 DOM 操作
        // oldEndVNode.el 移动到 oldStartVNode.el 前面
        insert(oldEndVNode.el, container, oldStartVNode.el);

        // 移动 DOM 完成后，更新索引值，并指向下一个位置
        oldEndVNode = oldChildren[--oldEndIdx];
        newStartVNode = newChildren[++newStartIdx];
      } else {
        // 遍历旧 children，试图寻找与 newStartVNode 拥有相同 key 值的元素
        const idxInOld = oldChildren.findIndex(
          (node) => node.key === newStartVNode.key
        );
        // idxInOld 大于 0，说明找到了可复用的节点，并且需要将其对应的真实 DOM 移动到头部
        if (idxInOld > 0) {
          // idxInOld 位置对应的 vnode 就是需要移动的节点
          const vnodeToMove = oldChildren[idxInOld];
          // 不要忘记除移动操作外还应该打补丁
          patch(vnodeToMove, newStartVNode, container);
          // 将 vnodeToMove.el 移动到头部节点 oldStartVNode.el 之前，因此使用后者作为锚点
          insert(vnodeToMove.el, container, oldStartVNode.el);
          // 由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到了别处，因此将其设置为 undefined
          oldChildren[idxInOld] = undefined;
        } else {
          // 将 newStartVNode 作为新节点挂载到头部，使用当前头部节点 oldStartVNode.el 作为锚点
          patch(null, newStartVNode, container, oldStartVNode.el);
        }
        // 最后更新 newStartIdx 到下一个位置
        newStartVNode = newChildren[++newStartIdx];
      }
    }
    // 循环结束后检查索引值的情况，
    if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
      // 如果满足条件，则说明有新的节点遗留，需要挂载它们
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        patch(null, newChildren[i], container, oldStartVNode.el);
      }
    } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
      // 移除操作
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        unmount(oldChildren[i]);
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
