### 模块化

#### 模块化演变过程

- 文件划分方式（完全依靠约定）
  - 污染全局作用域
  - 命名冲突问题
  - 无法管理模块依赖关系
- 命名空间方式（每个模块只暴露一个全局对象，所有模块成员都挂载到这个对象中）
- IIFE(Immediately-Invoked Function Expression) 立即执行函数为模块化提供私有空间，通过传参确定模块的依赖关系

#### 模块化规范

模块化标准+模块加载器

- CommonJS 规范(以同步模式加载模块，启动过程中加载模块，执行过程中不需要再去加载，只需要使用模块，在 node 中不会有问题，在浏览器中使用会导致大量同步请求出现)
  - 一个文件就是一个模块
  - 每个模块都有单独的作用域
  - 通过 module.exports 导出成员
  - 通过 require 函数载入模块
- AMD(Asynchronous Module Definition)
  - 使用相对复杂
  - 模块 JS 文件请求频繁
- sea.js + CMD
- ES Modules
  - 自动采用严格模式，忽略'use strict'
  - 每个 ESM 模块都是单独的私有作用域
  - ESM 是通过 CORS 去请求外部 JS 模块的
  - ESM 的 script 标签会延迟执行脚本

#### ES Modules in Node.js - 与 CommonJS 交互

- ES Modules 中可以导入 CommonJS 模块
- CommonJS 中不能导入 ES Modules 模块
- CommonJS 始终只会导出一个默认成员
- import 不是解构导出对象

#### ES Modules 和 CommonJS 的区别

### webpack打包

#### 模块打包工具的由来

- ES Modules存在环境兼容问题 - 将新特性代码编译为浏览器可执行的代码
- 模块文件过多，网络请求频繁 - 将散落的模块文件打包到一起（Bundle.js）
- 所有的前端资源都需要模块化 - 将资源文件都当作模块使用以便统一模块化方案

#### 模块打包工具的概要

打包工具解决的是前端整体的模块化，并不单指JavaScript模块化

- 模块打包器（Module bundler）- 将散落的模块文件打包到一起
- 模块加载器（Loader）- 将有环境兼容问题的代码，在打包的过程中，通过模块加载器（Loader）来进行编译转换
- 代码拆分（Code Splitting）- 将代码按照需要打包，把项目运行过程中初次运行过程中必须的模块打包到一起，其他模块等应用过程中需要时再进行异步加载，避免bundle.js文件过大、文件过碎，实现增量加载、渐进加载
- 模块资源（Asset Module）- 支持在js中以模块化的方式载入任何类型的资源文件

#### 使用

```shell
yarn init -y
yarn add webpack webpack-cli --dev
yarn webpack
```

#### Loader

Loader是Webpack的核心特性

借助于Loader就可以加载任何类型的资源

**为什么在js里面导入css等文件（为什么样式和行为不分离了）**

根据代码的需要动态导入资源，需要资源的不是应用，而是代码

js驱动整个前端应用

- 逻辑合理，js确实需要这些资源文件
- 确保上线资源不缺失，都是必要的

**资源模块的加载**

css文件加载（通过css-loader将文件打包到bundle.js中）

```shell
yarn add css-loader --dev
yarn add style-loader --dev
```

webpack.config.js

```js
// style-loader将css-loader转换过后的结果通过style标签的形式追加到页面上
module: {
  rules: [
    {
      test: /.css$/,
      use: ["style-loader", "css-loader"], //从后往前执行
    },
  ],
},
```

**文件资源加载器**

图片、字体等没有办法通过js去表示

```shell
yarn add file-loader --dev
```



### 常用的模块化打包工具



### 基于模块化工具构建现代 Web 应用



### 打包工具的优化技巧