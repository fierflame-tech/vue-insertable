Vue Insertable
========

`vue-insertable` 是一个能够在不改变已有模块代码的前提下，为已有模块添加页面功能的扩展。

安装
--------

> `vue-insertable` 需要 `Vue.js` 2.3.0 以上版本支持

### 直接下载 / CDN
```
https://unpkg.com/vue-insertable/dist/vue-insertable.js
```

[Unpkg.com](https://unpkg.com/) 提供了基于 NPM 的 CDN 链接。上面的链接会一直指向在 NPM 发布的最新版本。你也可以像 https://unpkg.com/vue-insertable@0.1.0/dist/vue-insertable.js 这样指定 版本号 或者 Tag。  

在 Vue 后面加载 vue-insertable，它会自动安装的：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-insertable.js"></script>
```

### NPM  

```bash
npm install vue-insertable
```

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：  

```JavaScript
import Vue from 'vue'
import VueInsertable from 'vue-insertable'

Vue.use(VueInsertable)
```
如果使用全局的 script 标签，则无须如此 (手动安装)。

使用
--------

### HTML

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-insertable/dist/vue-insertable.js"></script>

<div id="app">
  <h1>Hello App!</h1>
	<!-- 使用 insert-view 组件在插入注册的组件 -->
	<!-- name 为注册的名称 -->
	<!-- <insert-view /> 会渲染出指定注册名的所有组件 -->
	<!-- <insert-view /> 会将属性及事件传递给组件 -->
	<insert-view name="insert1" custom-attribute="myValue"></insert-view>
	<!-- 渲染结果同下： -->
	<!-- <vue-com1 name="insert1" custom-attribute="myValue"></vue-com1> -->
	<!-- <vue-com2 name="insert1" custom-attribute="myValue"></vue-com2> -->
	<!-- <vue-com1 name="insert1" custom-attribute="myValue"></vue-com1> -->
	<!-- 同一组件组件在同一名称下注册多次，将会被渲染多次 -->

	<insert-view name="insert2" custom-attribute="myValue"></insert-view>
	<!-- 渲染结果同下： -->
	<!-- <vue-com3 name="insert2" custom-attribute="myValue" class="a"></vue-com3> -->
	<!-- <vue-com2 name="insert2" custom-attribute="myValue" class="a"></vue-com2> -->
	<!-- <vue-com1 name="insert2" custom-attribute="myValue" class="a"></vue-com1> -->
	<!-- <div name="insert2" custom-attribute="myValue" class="a"></div> -->
	<!-- 普通的 html 标签也支持 -->

	<!-- <insert-view /> 如果被引入多次将会被渲染多次，，即便 name 相同 -->
	<insert-view name="insert1"></insert-view>
	<!-- 渲染结果同下： -->
	<!-- <vue-com1 name="insert1"></vue-com1> -->
	<!-- <vue-com2 name="insert1"></vue-com2> -->
	<!-- <vue-com1 name="insert1"></vue-com1> -->
</div>
```




### JavaScript

```JavaScript
// 0. 如果使用模块化机制编程，导入Vue和VueInsertable，要调用 Vue.use(VueInsertable)


// 1. 定义组件。
// 可以从其他文件 import 进来
const VueCom1 = {props: ['customAttribute'], template: `<div @click="$emit('click', '666')">{{customAttribute}}组件1</div>`};
const VueCom2 = {template: '<div>组件2</div>'};
const VueCom3 = {template: '<div>组件3</div>'};


// 2. 创建 insertable 实例
const insertable = new VueInsertable()


// 3. 添加组件
insertable.add('insert1', VueCom1);
insertable.add('insert1', VueCom2);
// 同一组件组件在同一名称下注册多次，将会被渲染多次
insertable.add('insert1', VueCom1);

insertable.add('insert2', VueCom3);
insertable.add('insert2', VueCom2);
insertable.add('insert2', VueCom1);
// 普通的 html 标签也支持
insertable.add('insert2', 'div');


// 4. 创建和挂载根实例。
// 记得要通过 insertable 配置参数注入，
// 从而让整个应用都有 insertable 功能
const app = new Vue({
	insertable,
}).$mount('#app');
// 现在，应用已经启动了！
```
