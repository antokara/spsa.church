import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as merge from 'webpack-merge';
import { default as common } from './webpack.common';

module.exports = (env: NodeJS.ProcessEnv): Configuration =>
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
