import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**' // only transpile our source code
  })
];

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'lib/index.js'
    },
    plugins
  },
  {
    input: 'src/runtime.js',
    output: {
      format: 'cjs',
      file: 'lib/runtime.js'
    },
    plugins
  }
];
