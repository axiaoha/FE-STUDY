### Rollup

#### 与webpack的区别

rollup更为小巧

仅仅是一款ESM打包器

不支持类似HMR这种高级特性

提供一个充分利用ESM各项特性的高效打包器

#### 使用

```
yarn rollup <input> --format iife --file <output>// iife自调用函数，最适合浏览器
```

打包结果不包含未被使用的代码，Tree shaking的概念最早在rollup中提出的

#### 配置文件

```
export default {
  input: <input>,
  output: {
    file: <output>,
    format: 'iife'
  }
}
```

```
yarn rollup --config //读取配置文件，默认不会读取配置文件
```

#### 插件

插件是rollup唯一扩展途径，webpack有三种（loader、plugin、minimizer）

##### rollup-plugin-json

```
yarn add rollup-plugin-json --dev
```

json中未被使用的成员也会被tree-shaking掉

##### rollup-plugin-node-resolve

rollup默认只能通过加载文件路径的形式来加载模块，引入该插件可以直接加载npm模块

##### rollup-plugin-commonjs

加载cjs模块

```
yarn add rollup-plugin-commonjs --dev
```

#### 代码拆分

iife模式没办法实现代码拆分，使用amd的格式

#### 多入口打包

自动提取公共模块，所以也不能使用iife模式

### Rollup/webpack选用

#### 优点

- 输出结果更加扁平
- 自动移除未引用代码
- 打包结果依然完全可读

#### 缺点

- 加载非ESM的第三方模块比较复杂
- 模块最终都被打包到一个函数中，无法实现HMR
- 浏览器环境中，代码拆分依赖AMD库

如果正在开发应用程序，rollup不能满足

正在开发一个框架或者类库可以使用rollup，大多数知名框架/库都在使用rollup(因为不会太过依赖第三方模块)

webpack大而全，rollup小而美，但是rollup的很多优点现在webpack的插件也能支持









