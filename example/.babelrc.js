const path = require('path');

module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/env',
      {
        modules: false
      }
    ],
    '@babel/react'
  ];
  const plugins = [
    [
      'babel-plugin-jsx-svg-import',
      {
        displayName: 'Icon',
        propName: 'type',
        directory: '/assets/',
        importComponent: true
      }
    ],
    '@babel/plugin-transform-react-jsx'
  ];

  return {
    presets,
    plugins
  };
};
