<template>
  <!-- vue3 新添加了一个默认的组件就叫 Teleport，我们可以拿过来直接使用，它上面有一个
  to 的属性，它接受一个css query selector
  作为参数，这就是代表要把这个组件渲染到哪个 dom 元素中 -->
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h1><slot>is a modal</slot></h1>
      <button @click="btnClick">Close</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const btnClick = () => {
      context.emit("close-modal");
    };
    return {
      btnClick,
    };
  },
});
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
