// 动态节点栈
const dynamicChildrenStack = [];
// 当前动态节点集合
let currentDynamicChildren = null;
// openBlock 用来创建一个新的动态节点集合，并将该集合压入栈中
function openBlock() {
  dynamicChildrenStack.push((currentDynamicChildren = []));
}
// closeBlock 用来将通过 openBlock 创建的动态节点集合从栈中弹出
function closeBlock() {
  currentDynamicChildren = dynamicChildrenStack.pop();
}

function createVNode(tag, props, children, flags) {
  const key = props && props.key;
  props && delete props.key;

  const vnode = {
    tag,
    props,
    children,
    key,
    patchFlags: flags,
  };

  if (typeof flags !== "undefined" && currentDynamicChildren) {
    // 动态节点，将其添加到当前动态节点集合中
    currentDynamicChildren.push(vnode);
  }

  return vnode;
}

function render() {
  // 1. 使用 createBlock 代替 createVNode 来创建 block
  // 2. 每当调用 createBlock 之前，先调用 openBlock
  return (
    openBlock(),
    createBlock("div", null, [
      createVNode("p", { class: "foo" }, null, 1 /* patch flag */),
      createVNode("p", { class: "bar" }, null),
    ])
  );
}

function createBlock(tag, props, children) {
  // block 本质上也是一个 vnode
  const block = createVNode(tag, props, children);
  // 将当前动态节点集合作为 block.dynamicChildren
  block.dynamicChildren = currentDynamicChildren;

  // 关闭 block
  closeBlock();
  // 返回
  return block;
}

console.log(render());
// {
//   "tag": "div",
//   "props": null,
//   "children": [
//       {
//           "tag": "p",
//           "props": {
//               "class": "foo"
//           },
//           "children": null,
//           "patchFlags": 1
//       },
//       {
//           "tag": "p",
//           "props": {
//               "class": "bar"
//           },
//           "children": null
//       }
//   ],
//   "key": null,
//   "dynamicChildren": [
//       {
//           "tag": "p",
//           "props": {
//               "class": "foo"
//           },
//           "children": null,
//           "patchFlags": 1
//       }
//   ]
// }
