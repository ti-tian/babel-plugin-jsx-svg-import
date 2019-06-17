# @qunhe/babel-plugin-jsx-svg-import

> 自动引入 `svg` 文件的 `babel` 插件

> 配合 svg-sprite-loader 使用

## 功能

- 不需要手动引入 `svg` 文件，在文件中自动引入 `svg`
- 不需要提供自定义 `Icon` 组件, 插件可以自动引入 `Icon` 组件

## 参数

```javascript
{
  "displayName": "Icon", // 默认: "Icon", 图标组件名称
  "propName": "type",   // 默认: “type” 指定图标名称的参数名
  "directory": "/assets/", // 存放 svg 的文件夹名称
  "importComponent": false, // 默认：false, 不需要自定义图标组件，使用插件提供的图标组件
}
```

## [例子](https://gitlab.qunhequnhe.com/titian/babel-plugin-jsx-svg-import/tree/master/example)

### 不使用 importComponent

```javascript
[
  '@qunhe/babel-plugin-jsx-svg-import',
  {
    displayName: 'Icon',
    propName: 'type',
    directory: '/assets/'
  }
];
```

```javascript
import Icon from './Icon.jsx';

ReactDOM.render(<Icon type="close"/>);

      ↓ ↓ ↓ ↓ ↓ ↓

import './assets/close.svg'

ReactDOM.render(<Icon type="close"/>);
```

### 使用 importComponent

```javascript
[
  '@qunhe/babel-plugin-jsx-svg-import',
  {
    displayName: 'Icon',
    propName: 'type',
    directory: '/assets/',
    importComponent: true
  }
];
```

```javascript
ReactDOM.render(<Icon type="close"/>);

      ↓ ↓ ↓ ↓ ↓ ↓

import Icon from '@qunhe/babel-plugin-jsx-svg-import/lib/runtime';
import './assets/close.svg'

ReactDOM.render(<Icon type="close"/>);
```

## Icon Component 参数

> 同 antd Icon

| 字段      | 说明                    | 类型             | 只读值         |
| --------- | ----------------------- | ---------------- | -------------- |
| width     | `svg` 元素宽度          | string \| number | '1em'          |
| height    | `svg` 元素高度          | string \| number | '1em'          |
| fill      | `svg` 元素填充的颜色    | string           | 'currentColor' |
| className | 计算后的 `svg` 类名     | string           | -              |
| style     | 计算后的 `svg` 元素样式 | CSSProperties    | -              |
