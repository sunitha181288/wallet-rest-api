const paths = {
  APP_DIR: path.resolve(__dirname, '..', 'src'),
};

exports.resolveRoot = [paths.APP_DIR, 'node_modules'];

exports.aliases = {
  '@src': path.resolve(paths.APP_DIR, ''),
  '@environment': path.resolve(paths.APP_DIR, 'environment'),
  '@controllers': path.resolve(paths.APP_DIR, 'controllers'),
  '@models': path.resolve(paths.APP_DIR, 'models'),
  '@modules': path.resolve(paths.APP_DIR, 'modules'),
  '@services': path.resolve(paths.APP_DIR, 'services'),
  '@pipes': path.resolve(paths.APP_DIR, 'pipes'),
  '@schemas': path.resolve(paths.APP_DIR, 'schemas'),
};
