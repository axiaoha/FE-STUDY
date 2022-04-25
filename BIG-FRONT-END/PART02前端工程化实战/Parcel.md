零配置的前端应用打包器

```
yarn add parcel-bundler --dev
```

支持热替换，和webpack有点区别，webpack需要指定变化的模块

自动安装依赖

引入css、png等不需要配置

生产环境下：

```
yarn parcel build <entry>
```

parcel的打包速度很快，因为内部使用多进程工作，充分发挥多核CPU的性能，webpack可以使用happypack的插件来实现