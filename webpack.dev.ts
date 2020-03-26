import * as fs from 'fs';
import * as path from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import { Configuration } from 'webpack-dev-server';
import merge from 'webpack-merge';
import common from './webpack.common';

module.exports = (env: NodeJS.ProcessEnv): Configuration =>
  merge(common(env), {
    mode: 'development',
    devtool: 'eval',
    devServer: {
      contentBase: path.join(__dirname, './'),
      compress: true,
      port: 9000,
      https: {
        key: fs.readFileSync('assets/archive/ssl/server.key'),
        cert: fs.readFileSync('assets/archive/ssl/server.crt'),
        ca: fs.readFileSync('assets/archive/ssl/server_rootCA.pem'),
      },
      open: false,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
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
        ReactHotLoader$: 'react-hot-loader',
      },
    },
    plugins: [new HotModuleReplacementPlugin()],
  });
