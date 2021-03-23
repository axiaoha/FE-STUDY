// Plop入口文件，需要导出一个函数
// 此函数接收一个plop对象，用于创建生成器任务

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "create a component",
    prompts: [
      {
        type: "input",
        name: "dirname",
        message: "component dirname",
        default: "dir",
      },
      {
        type: "input",
        name: "name",
        message: "component name",
        default: "MyComponent",
      },
    ],
    actions: [
      {
        type: "add", // 代表添加文件
        path: "src/components/{{dirname}}/{{name}}.vue",
        templateFile: "plop-templates/component.hbs",
      },
    ],
  });
  plop.setGenerator("view", {
    description: "create a view",
    prompts: [
      {
        type: "input",
        name: "dirname",
        message: "view dirname",
        default: "dir",
      },
      {
        type: "input",
        name: "name",
        message: "view name",
        default: "view",
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: "add", // 代表添加文件
          path: `src/views/${data.dirname}/${data.name}.vue`,
          templateFile: "plop-templates/view.hbs",
          data: {
            name: data.name,
            dirname: data.dirname,
          },
        },
      ];
      return actions;
    },
  });
};
