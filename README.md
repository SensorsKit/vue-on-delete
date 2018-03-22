# vue-on-delete

[![npm (scoped)](https://img.shields.io/npm/v/@sensorskit/vue-on-delete.svg)](https://www.npmjs.com/package/@sensorskit/vue-on-delete)
[![Build Status](https://travis-ci.org/SensorsKit/vue-on-delete.svg?branch=master)](https://travis-ci.org/SensorsKit/vue-on-delete)

[[在线预览]](https://sensorskit.github.io/vue-on-delete/)

> 通用的「是否删除」监听逻辑：**输入框字符减少的同时没有新增字符**
>
> 示例：
>
> * 输入框里有字符存在时，按下了退格键，算删除
> * 输入框里没有字符，按下退格键，不算删除
> * 输入框里选中了一段文字，按下退格键，算删除
> * 输入框里选中了一段文字，键入别的字符，此时选中文字会被替换掉，不算删除

## 使用

```bash
yarn add @sensorskit/vue-on-delete
```

在 Vue.js 项目的入口处引入：

```js
import VueOnDelete from '@sensorskit/vue-on-delete'

Vue.use(VueOnDelete)

// 如果需要自定义选项
Vue.use(VueOnDelete, {
  directive: 'your-custom-directive-name'
})
```

在需要绑定删除逻辑的地方引入自定义指令：

```html
<input type="text" v-on-delete="onDelete">

<!-- 如果自定义了directive name -->
<input type="text" v-your-custom-name="onDelete">
```
