import path from 'path';

const runtimeName = 'babel-plugin-jsx-svg-import/lib/runtime';

export default class Plugin {
  constructor(opts, types) {
    this.opts = this.validateOpts(opts);
    this.importIdentifier = null;
    this.types = types;
  }

  ImportDeclaration(path, state) {
    const { node } = path;
    const { displayName, importComponent } = this.opts;
    if (!node || state.IMPORTED_COMPONENT || !displayName || !importComponent) {
      return;
    }
    const types = this.types;
    for (const spec of node.specifiers) {
      if (
        types.isImportSpecifier(spec) ||
        types.isImportDefaultSpecifier(spec) ||
        types.isImportNamespaceSpecifier(spec)
      ) {
        if (spec.local && spec.local.name === displayName) {
          state.IMPORTED_COMPONENT = true;
          return;
        }
      }
    }
  }

  ProgramEnter(program, state) {
    state.svgCache = new Set();
    state.IMPORTED_COMPONENT = false;
  }

  ProgramExit(program, state) {
    const { svgCache, IMPORTED_COMPONENT } = state;

    if (IMPORTED_COMPONENT || svgCache.size === 0) {
      return;
    }
    if (this.opts.importComponent) {
      this.addComponentImport(program, state);
    }
    this.addAllSvgImport(program, state);
  }

  JSXElement(path, state) {
    const { displayName, propName, importComponent } = this.opts;
    const types = this.types;

    const {
      openingElement: { name: identifier, attributes },
    } = path.node;

    if (displayName && identifier.name !== displayName) {
      return;
    }

    attributes
      .filter(({ name, value }) => {
        return types.isJSXIdentifier(name) && types.isStringLiteral(value);
      })
      .forEach(({ name, value }) => {
        if (propName === name.name) state.svgCache.add(value.value);
      });

    if (importComponent) {
      this.importIdentifier = this.importIdentifier || identifier;
    }
  }

  validateOpts(opts) {
    if (!opts.directory) {
      throw new Error('Invalid configuration , directory should be provided !');
    }
    return { displayName: '', propName: 'type', prefix: '', ...opts };
  }

  addSvgImport({ program, svgPath, svgName }) {
    const identifier = program.scope.generateUidIdentifier(svgName);
    const types = this.types;
    program.unshiftContainer(
      'body',
      types.importDeclaration(
        [types.importDefaultSpecifier(identifier)],
        types.stringLiteral(svgPath),
      ),
    );
  }

  // 添加 Icon Component 引入
  addComponentImport(program, state) {
    const types = this.types;
    program.unshiftContainer(
      'body',
      types.importDeclaration(
        [types.importDefaultSpecifier(this.importIdentifier)],
        types.stringLiteral(runtimeName),
      ),
    );
    state.IMPORTED_COMPONENT = true;
  }

  // 获取 svgPath
  getSvgPath({ cwd, directory, prefix, svgName }) {
    const svgPath = path.join(cwd, directory, prefix, `${svgName}.svg`);
    return fs.existsSync(svgPath) ? svgPath : false;
  }

  // 添加所有 svg
  addAllSvgImport(program, state) {
    const { svgCache, cwd } = state;
    const { directory, prefix } = this.opts;
    for (const svgName of svgCache) {
      const svgPath = this.getSvgPath({ cwd, directory, prefix, svgName });
      if (svgPath) this.addSvgImport({ program, svgPath, svgName });
    }
  }
}
