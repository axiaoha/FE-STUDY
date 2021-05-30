<template>
  <div>
    <p>123</p>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in posts" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'App',
  components: {},
  data() {
    return {
      title: '',
      posts: []
    };
  },
  // Nuxt中特殊提供的一个钩子函数，专门用于获取页面服务端渲染的数据
  // 不会单独请求/data.json
  // async asyncData() {
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: 'http://localhost:3000/data.json' // 地址需要完整，因为这里执行的代码是在服务器端执行的
  //   });
  //   console.log(data);
  //   // 这里返回的数据会和data(){}中的数据合并到一起给页面使用
  //   return data;
  //   // return {
  //   //   title: data.title,
  //   //   posts: data.posts
  //   // };
  // }

  // 会单独请求/data.json
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: '/data.json'
    });
    console.log('data', data);
    this.title = data.title;
    this.posts = data.posts;
  }
};
</script>
<style></style>
