<template>
  <div>
    <div>用户信息</div>
    <button @click="asc">升序</button>
    <button @click="desc">降序</button>
    <button @click="reset">重置</button>
    <ul>
      <li v-for="(item, index) in userList" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userList: [],
    };
  },
  //   created () {
  //     axios
  //       .get('http://jsonplaceholder.typicode.com/users')
  //       .then(res => {
  //         console.log(res)
  //         this.userList = res.data
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  async created() {
    const { data } = await axios.get(
      "http://jsonplaceholder.typicode.com/users"
    );
    // 代理
    this.proxy = new Proxy(
      {},
      {
        get(target, key) {
          if (key === "asc") {
            // 升序
            return [].concat(data).sort((a, b) => (a.name > b.name ? 1 : -1));
          } else if (key === "desc") {
            // 降序
            return [].concat(data).sort((a, b) => (b.name > a.name ? 1 : -1));
          } else {
            return data;
          }
        },
        set() {
          return false;
        },
      }
    );
    this.userList = this.proxy.default;
  },
  methods: {
    asc() {
      this.userList = this.proxy.asc;
    },
    desc() {
      this.userList = this.proxy.desc;
    },
    reset() {
      this.userList = this.proxy.default;
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
ul {
  padding: 0;
}
</style>
