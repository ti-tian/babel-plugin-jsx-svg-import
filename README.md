# babel-plugin-jsx-svg-import

[中文文档](https://github.com/ti-tian/babel-plugin-jsx-svg-import/blob/master/README.zh.md)

[![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-svg-import.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-jsx-svg-import)

> add `svg` file imports for `jsx` elements。

> with svg-sprite-loader

## Features

- There is no need to manually import the `svg` file, which automatically import `svg` in the file.
- There is no need to provide a custom `Icon` component, the plugin can automatically import the `Icon` component

## Options

```javascript
{
  "displayName": "Icon",
  "propName": "type",
  "directory": "/assets/",
  "importComponent": false,
}
```

### no use [importComponent]

```javascript
[
  'babel-plugin-jsx-svg-import',
  {
    displayName: 'Icon',
    propName: 'type',
    directory: '/assets/',
  },
];
```

```javascript
import Icon from './Icon.jsx';

ReactDOM.render(<Icon type="close"/>);

      ↓ ↓ ↓ ↓ ↓ ↓

import './assets/close.svg'

ReactDOM.render(<Icon type="close"/>);
```

### use importComponent

```javascript
[
  'babel-plugin-jsx-svg-import',
  {
    displayName: 'Icon',
    propName: 'type',
    directory: '/assets/',
    importComponent: true,
  },
];
```

```javascript
ReactDOM.render(<Icon type="close"/>);

      ↓ ↓ ↓ ↓ ↓ ↓

import Icon from 'babel-plugin-jsx-svg-import/lib/runtime';
import './assets/close.svg'

ReactDOM.render(<Icon type="close"/>);
```

## Icon Component

> from antd Icon

| prop      | desc                     | type             | default        |
| --------- | ------------------------ | ---------------- | -------------- |
| width     | `svg` element width      | string \| number | '1em'          |
| height    | `svg` element height     | string \| number | '1em'          |
| fill      | `svg` element fill color | string           | 'currentColor' |
| className | `svg` element class      | string           | -              |
| style     | `svg` element style      | CSSProperties    | -              |
