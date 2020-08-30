const path = require('path');

const extraNodeModules = {
  'common': path.join(__dirname, '..', 'common'),
  'root': path.join(__dirname, '..', '..')
};
const watchFolders = [
  path.join(__dirname, '..', 'common')
];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }, 
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};