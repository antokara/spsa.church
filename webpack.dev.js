const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'eval',
    devServer: {
      contentBase: path.join(__dirname, './'),
      compress: true,
      port: 9000,
      https: true,
      open: false,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      disableHostCheck: true
    },
    entry: ['react-hot-loader/patch'],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        /**
         * avoid development packages in production build
         *
         * @see https://web-dev-etc.blogspot.com/2017/12/dynamic-import-of-es6-modules-with.html
         * @see tslint.json, tsconfig.json, tsconfig.build.json
         */
        'redux-logger': 'redux-logger',
        'redux-devtools-extension': 'redux-devtools-extension',
        ReactHotLoader$: 'react-hot-loader'
      }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
