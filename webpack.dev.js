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
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
