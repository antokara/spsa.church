const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
require('dotenv').config();

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

// constants
const title = 'St. Peter & St. Andrew Coptic Orthodox Church';
const shortName = 'spsa.church';
const description =
  'Web Application of St. Peter & St. Andrew Coptic Orthodox Church';

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|reports)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
      systemvars: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      title,
      minify: false,
      inject: false,
      template: HtmlWebpackTemplatePlugin,
      lang: 'en-US',
      appMountId: 'root',
      baseHref: '/'
    }),
    new WebpackPwaManifest({
      name: title,
      short_name: shortName,
      description,
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('assets/churchLogo.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
        {
          src: path.resolve('assets/churchLogo.png'),
          size: '1024x1024'
        }
      ]
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/sw.js'),
      swDest: 'sw.js'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
