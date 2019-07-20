module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'arrow-parens': 0,
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
      },
    ],
    eqeqeq: 2,
    semi: 2,
    quotes: [2, 'single'],
    'no-eval': 1,
    'no-multi-str': 2,
    'no-new-func': 1,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-redeclare': 2,
    'no-unreachable': 2,
    'no-with': 2,
    'default-case': 2,
  },
  globals: {
    window: false,
    $: false,
    require: false,
    define: false,
    seajs: false,
    document: false,
  },
};
