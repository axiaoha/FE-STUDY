<template>
  <div>
    <h1>Hello Nuxt.js!</h1>
    <p>{{ title }}</p>
    <p>{{ alt }}</p>
    <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  async asyncData() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/abc/data.json'
    });
    console.log(data);
    // 数据会混入组件的Vue 实例的数据对象data，可查看HomePage组件
    return data;
  },
  // 如果是非异步数据或者普通数据，则正常的初始化到data中即可
  data() {
    return {
      alt: 'alt'
    };
  }
};
</script>
<style>
</style>