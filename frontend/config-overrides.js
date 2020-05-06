const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    // '@home-scss': path.resolve(__dirname, 'src/asset/css/home.module.scss'),
    // '@common-scss': path.resolve(__dirname, 'src/asset/css/common.module.scss'),
  })
)
