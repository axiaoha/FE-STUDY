import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../../vuerouter";
import Index from "../views/Index.vue";
// import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
