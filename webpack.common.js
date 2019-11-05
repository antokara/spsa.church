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

module.exports = env => {
  const environment =
    env && env.NODE_ENV ? env.NODE_ENV.toLocaleLowerCase() : 'development';
  return {
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
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist')
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
                configFile:
                  environment === 'development'
                    ? 'tsconfig.json'
                    : 'tsconfig.build.json'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: environment,
        DEBUG: false
      }),
      new Dotenv({
        path: path.resolve(__dirname, '.env'),
        safe: true,
        systemvars: true,
        silent: true
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false
      }),
      new HtmlWebpackPlugin({
        title,
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
        lang: 'en-US',
        appMountId: 'root',
        baseHref: '/'
      }),
      new WebpackPwaManifest({
        name: title,
        short_name: shortName,
        description,
        theme_color: '#82171d',
        background_color: '#c68567',
        display: 'standalone',
        crossorigin: 'use-credentials',
        orientation: 'portrait',
        inject: true,
        ios: {
          'apple-mobile-web-app-title': title,
          'apple-mobile-web-app-status-bar-style': 'black'
        },
        icons: [
          {
            src: path.resolve(__dirname, `assets/churchLogo.png`),
            sizes: [96, 128, 192, 256, 384, 512]
          },
          {
            src: path.resolve(__dirname, `assets/churchLogo.png`),
            size: '1024x1024'
          }
        ]
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, 'src/sw.js'),
        swDest: 'sw.js'
      }),
      new webpack.NamedModulesPlugin()
    ]
  };
};
