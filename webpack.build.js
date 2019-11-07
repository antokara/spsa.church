const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = env =>
  merge(common(env), {
    mode: 'production',
    devtool: false,
    resolve: {
      alias: {
        /**
         * avoid development packages in production build
         *
         * @see https://web-dev-etc.blogspot.com/2017/12/dynamic-import-of-es6-modules-with.html
         * @see tslint.json, tsconfig.json, tsconfig.build.json
         */
        'redux-logger': path.resolve(
          __dirname,
          'src/helpers/nop/createLogger.ts'
        ),
        'redux-devtools-extension': path.resolve(
          __dirname,
          'src/helpers/nop/composeWithDevTools.ts'
        ),
        ReactHotLoader$: path.resolve(__dirname, 'src/helpers/nop/hot.ts')
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../reports/BundleAnalyzerReport.html',
        openAnalyzer: false
      })
    ]
  });
