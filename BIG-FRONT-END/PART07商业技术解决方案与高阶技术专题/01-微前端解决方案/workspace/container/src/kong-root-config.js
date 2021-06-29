import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes } from "single-spa-layout";

// 获取路由配置对象
const routes = constructRoutes(document.getElementById("single-spa-layout"));
// 获取路由信息数组
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
// 便利路由信息注册应用
applications.forEach(registerApplication);

// 注册微应用
// registerApplication({
//   name: "@single-spa/welcome", // name：字符串类型，微前端应用名称 @组织名称/应用名称
//   // app：函数类型，返回promise，通过systemjs引用打包好的微前端应用模块代码（umd）
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js" // 微应用打包好的模块所对应的地址
//     ),
//   activeWhen: ["/"], // activeWhen：当前微应用被激活的时机，路由匹配时激活应用
// });

// registerApplication(
//   "@single-spa/welcome",
//   () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   (location) => location.pathname === "/" // 精准匹配
// );

// registerApplication({
//   name: "@aha/micro-spa-one",
//   app: () => System.import("@aha/micro-spa-one"),
//   activeWhen: ["/micro-spa-one"],
// });

// registerApplication({
//   name: "@gun/micro-react-spa",
//   app: () => System.import("@gun/micro-react-spa"),
//   activeWhen: ["/micro-react-spa"],
// });

// registerApplication({
//   name: "@gang/micro-vue-spa",
//   app: () => System.import("@gang/micro-vue-spa"),
//   activeWhen: ["/micro-vue-spa"],
// });

// 启动应用
// start方法必须在single spa的配置文件中调用
// 在调用start之前，应用会被加载，但不会初始化、挂载或者卸载
start({
  // 是否允许通过history.pushState()和history.replaceState()更改触发single-spa路由
  urlRerouteOnly: true,
});
