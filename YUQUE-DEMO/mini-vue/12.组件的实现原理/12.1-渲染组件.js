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

const MyComponent = {
  // 组件名称，可选
  name: "MyComponent",
  // 组件的渲染函数，其返回值必须为虚拟 DOM
  render() {
    // 返回虚拟 DOM
    return {
      type: "div",
      children: `我是文本内容`,
    };
  },
};
// 用来描述组件的 VNode 对象，type 属性值为组件的选项对象
const CompVNode = {
  type: MyComponent,
};
// 调用渲染器来渲染组件
renderer.render(CompVNode, document.querySelector("#app"));

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
    const { render } = componentOptions;
    // 执行渲染函数，获取组件要渲染的内容，即 render 函数返回的虚拟 DOM
    const subTree = render();
    // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
    patch(null, subTree, container, anchor);
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
