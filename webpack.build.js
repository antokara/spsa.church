const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: false,
  entry: path.resolve(__dirname, 'src/index.tsx'),
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
      systemvars: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'St. Peter & St. Andrew Coptic Orthodox Church',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        sortClassName: true,
        useShortDoctype: true,
        collapseWhitespace: true
      },
      inject: false,
      template: HtmlWebpackTemplatePlugin,
      mobile: true,
      lang: 'en-US',
      appMountId: 'root'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../reports/BundleAnalyzerReport.html',
      openAnalyzer: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|reports)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json'
            }
          }
        ]
      }
    ]
  }
};
