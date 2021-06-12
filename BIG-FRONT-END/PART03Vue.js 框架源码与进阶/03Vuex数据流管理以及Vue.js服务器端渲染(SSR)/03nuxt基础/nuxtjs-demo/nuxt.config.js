// Nuxt.js配置文件
module.exports = {
  router: {
    // 不配置直接访问http://localhost:3000就行，配置了之后需要访问http://localhost:3000/abc
    base: "/abc",
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/hello",
        name: "hello",
        component: resolve(__dirname, "pages/about.vue"),
      });
    },
  },
};
