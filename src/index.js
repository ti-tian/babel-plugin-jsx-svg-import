import Plugin from './plugin';

export default function({ types }) {
  let plugins = null;

  function applyInstance(method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context]);
      }
    }
  }

  const ret = {
    visitor: {
      Program: {
        enter(path, { opts }) {
          if (!plugins) {
            plugins = Array.isArray(opts)
              ? opts.map(opt => new Plugin(opt, types))
              : [new Plugin(opts, types)];
          }
          applyInstance('ProgramEnter', arguments, this);
        },
        exit() {
          applyInstance('ProgramExit', arguments, this);
        }
      }
    }
  };

  const methods = ['ImportDeclaration', 'JSXElement'];

  for (const method of methods) {
    ret.visitor[method] = function() {
      applyInstance(method, arguments, ret.visitor);
    };
  }

  return ret;
}
