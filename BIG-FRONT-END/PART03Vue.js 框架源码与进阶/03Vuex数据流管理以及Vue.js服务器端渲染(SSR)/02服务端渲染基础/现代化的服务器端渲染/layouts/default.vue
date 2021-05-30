<template>
  <div>
    <!-- 路由出口 -->
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
    <!-- 子页面出口 -->
    <nuxt />
  </div>
</template>
<script>
export default {};
</script>