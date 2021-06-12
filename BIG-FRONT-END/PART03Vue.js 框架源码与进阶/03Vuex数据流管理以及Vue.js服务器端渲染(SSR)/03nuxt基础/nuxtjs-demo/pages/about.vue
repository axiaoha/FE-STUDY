<template>
  <div>
    <h1>About Page</h1>
    <h2>a链接</h2>
    <a href="/">首页</a>

    <h2>router-link</h2>
    <router-link to="/">首页</router-link>

    <h2>nuxt-link</h2>
    <nuxt-link to="/">首页</nuxt-link>

    <h2>编程式导航</h2>
    <button @click="onClick">首页</button>
  </div>
</template>
<script>
export default {
  name: 'About',
  layout: 'foo',
  methods: {
    onClick() {
      console.log('hello');
      this.$router.push('/');
    }
  }
};
</script>
<style>
</style>