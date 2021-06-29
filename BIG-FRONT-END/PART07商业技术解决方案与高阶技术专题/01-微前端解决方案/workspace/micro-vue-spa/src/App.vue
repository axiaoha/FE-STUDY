<template>
  <div id="app">
    <!-- <Parcel :config="parcelConfig" :mountParcel="mountParcel"></Parcel> -->
    <div>
      <router-link to="/foo">foo</router-link>
      <router-link to="/bar">bar</router-link>
      <button @click="handleClick">button</button>
      <button @click="emit">广播</button>
    </div>
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Parcel from "single-spa-vue/dist/esm/parcel";
// import { mountRootParcel } from "single-spa";

export default {
  name: "App",
  components: {
    // Parcel,
    // HelloWorld
  },
  data() {
    return {
      // parcelConfig: window.System.import("@common/micro-parcel"),
      // mountParcel: mountRootParcel,
    };
  },
  methods: {
    async handleClick() {
      const utilsModule = await window.System.import("@common/micro-utils");
      utilsModule.sayHello("@gang/micro-vue-spa");
    },
    async emit() {
      const utilsModule = await window.System.import("@common/micro-utils");
      utilsModule.sharedSubject.next("hello hello hello");
    },
  },
  async mounted() {
    const utilsModule = await window.System.import("@common/micro-utils");
    utilsModule.sharedSubject.subscribe(console.log);
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
