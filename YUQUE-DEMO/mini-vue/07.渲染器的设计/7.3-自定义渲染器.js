const vnode = {
  type: "h1",
  children: "hello",
};
// 创建一个渲染器
// 在创建 renderer 时传入配置项
const renderer = createRenderer({
  // // 用于创建元素
  // createElement(tag) {
  //   return document.createElement(tag);
  // },
  // // 用于设置元素的文本节点
  // setElementText(el, text) {
  //   el.textContent = text;
  // },
  // // 用于在给定的 parent 下添加指定元素
  // insert(el, parent, anchor = null) {
  //   parent.insertBefore(el, anchor);
  // },
  createElement(tag) {
    console.log(`创建元素 ${tag}`);
    return { tag };
  },
  setElementText(el, text) {
    console.log(`设置 ${JSON.stringify(el)} 的文本内容：${text}`);
    el.textContent = text;
  },
  insert(el, parent, anchor = null) {
    console.log(`将 ${JSON.stringify(el)} 添加到 ${JSON.stringify(parent)} 下`);
    parent.children = el;
  },
});
// 调用 render 函数渲染该 vnode
renderer.render(vnode, document.querySelector("#app"));

function createRenderer(options) {
  // 通过 options 得到操作 DOM 的 API
  const { createElement, insert, setElementText } = options;
  function patch(n1, n2, container) {
    // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
    if (!n1) {
      mountElement(n2, container);
    } else {
      // n1 存在，意味着打补丁，暂时省略
    }
  }
  function mountElement(vnode, container) {
    // 调用 createElement 函数创建元素
    const el = createElement(vnode.type);
    if (typeof vnode.children === "string") {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children);
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container);
  }
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        container.innerHTML = "";
      }
    }
    container._vnode = vnode;
  }
  return {
    render,
  };
}
