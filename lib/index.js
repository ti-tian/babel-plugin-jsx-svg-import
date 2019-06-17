'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var runtimeName = 'babel-plugin-jsx-svg-import/lib/runtime';

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(opts, types) {
    _classCallCheck(this, Plugin);

    this.opts = this.validateOpts(opts);
    this.importIdentifier = null;
    this.types = types;
  }

  _createClass(Plugin, [{
    key: "ImportDeclaration",
    value: function ImportDeclaration(path, state) {
      var node = path.node;
      var _this$opts = this.opts,
          displayName = _this$opts.displayName,
          importComponent = _this$opts.importComponent;

      if (!node || state.IMPORTED_COMPONENT || !displayName || !importComponent) {
        return;
      }

      var types = this.types;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node.specifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var spec = _step.value;

          if (types.isImportSpecifier(spec) || types.isImportDefaultSpecifier(spec) || types.isImportNamespaceSpecifier(spec)) {
            if (spec.local && spec.local.name === displayName) {
              state.IMPORTED_COMPONENT = true;
              return;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "ProgramEnter",
    value: function ProgramEnter(program, state) {
      state.svgCache = new Set();
      state.IMPORTED_COMPONENT = false;
    }
  }, {
    key: "ProgramExit",
    value: function ProgramExit(program, state) {
      var svgCache = state.svgCache,
          IMPORTED_COMPONENT = state.IMPORTED_COMPONENT;

      if (IMPORTED_COMPONENT || svgCache.size === 0) {
        return;
      }

      if (this.opts.importComponent) {
        this.addComponentImport(program, state);
      }

      this.addAllSvgImport(program, state);
    }
  }, {
    key: "JSXElement",
    value: function JSXElement(path, state) {
      var _this$opts2 = this.opts,
          displayName = _this$opts2.displayName,
          propName = _this$opts2.propName,
          importComponent = _this$opts2.importComponent;
      var types = this.types;
      var _path$node$openingEle = path.node.openingElement,
          identifier = _path$node$openingEle.name,
          attributes = _path$node$openingEle.attributes;

      if (displayName && identifier.name !== displayName) {
        return;
      }

      attributes.filter(function (_ref) {
        var name = _ref.name,
            value = _ref.value;
        return types.isJSXIdentifier(name) && types.isStringLiteral(value);
      }).forEach(function (_ref2) {
        var name = _ref2.name,
            value = _ref2.value;
        if (propName === name.name) state.svgCache.add(value.value);
      });

      if (importComponent) {
        this.importIdentifier = this.importIdentifier || identifier;
      }
    }
  }, {
    key: "validateOpts",
    value: function validateOpts(opts) {
      if (!opts.directory) {
        throw new Error('Invalid configuration , directory should be provided !');
      }

      return _objectSpread({
        displayName: '',
        propName: 'type',
        prefix: ''
      }, opts);
    }
  }, {
    key: "addSvgImport",
    value: function addSvgImport(_ref3) {
      var program = _ref3.program,
          svgPath = _ref3.svgPath,
          svgName = _ref3.svgName;
      var identifier = program.scope.generateUidIdentifier(svgName);
      var types = this.types;
      program.unshiftContainer('body', types.importDeclaration([types.importDefaultSpecifier(identifier)], types.stringLiteral(svgPath)));
    } // 添加 Icon Component 引入

  }, {
    key: "addComponentImport",
    value: function addComponentImport(program, state) {
      var types = this.types;
      program.unshiftContainer('body', types.importDeclaration([types.importDefaultSpecifier(this.importIdentifier)], types.stringLiteral(runtimeName)));
      state.IMPORTED_COMPONENT = true;
    } // 获取 svgPath

  }, {
    key: "getSvgPath",
    value: function getSvgPath(_ref4) {
      var cwd = _ref4.cwd,
          directory = _ref4.directory,
          prefix = _ref4.prefix,
          svgName = _ref4.svgName;
      var svgPath = path.join(cwd, directory, prefix, "".concat(svgName, ".svg"));
      return fs.existsSync(svgPath) ? svgPath : false;
    } // 添加所有 svg

  }, {
    key: "addAllSvgImport",
    value: function addAllSvgImport(program, state) {
      var svgCache = state.svgCache,
          cwd = state.cwd;
      var _this$opts3 = this.opts,
          directory = _this$opts3.directory,
          prefix = _this$opts3.prefix;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = svgCache[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var svgName = _step2.value;
          var svgPath = this.getSvgPath({
            cwd: cwd,
            directory: directory,
            prefix: prefix,
            svgName: svgName
          });
          if (svgPath) this.addSvgImport({
            program: program,
            svgPath: svgPath,
            svgName: svgName
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return Plugin;
}();

function index (_ref) {
  var types = _ref.types;
  var plugins = null;

  function applyInstance(method, args, context) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plugin = _step.value;

        if (plugin[method]) {
          plugin[method].apply(plugin, [].concat(_toConsumableArray(args), [context]));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var ret = {
    visitor: {
      Program: {
        enter: function enter(path, _ref2) {
          var opts = _ref2.opts;

          if (!plugins) {
            plugins = Array.isArray(opts) ? opts.map(function (opt) {
              return new Plugin(opt, types);
            }) : [new Plugin(opts, types)];
          }

          applyInstance('ProgramEnter', arguments, this);
        },
        exit: function exit() {
          applyInstance('ProgramExit', arguments, this);
        }
      }
    }
  };
  var methods = ['ImportDeclaration', 'JSXElement'];

  var _loop = function _loop() {
    var method = _methods[_i];

    ret.visitor[method] = function () {
      applyInstance(method, arguments, ret.visitor);
    };
  };

  for (var _i = 0, _methods = methods; _i < _methods.length; _i++) {
    _loop();
  }

  return ret;
}

module.exports = index;
