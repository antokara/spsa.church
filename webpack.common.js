const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'assets')
      }
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist')
    },
    performance: {
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
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
        },
        {
          test: /\.gql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
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
      new HtmlWebpackPlugin({
        title: 'St. Peter & St. Andrew Coptic Orthodox Church',
        minify: false,
        inject: true,
        template: HtmlWebpackTemplatePlugin,
        mobile: true,
        lang: 'en-US',
        appMountId: 'root'
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, 'assets/churchLogo.png'),
        cache: true,
        inject: 'force',
        prefix: 'assets/',
        mode: 'webapp',
        devMode: 'webapp',
        // @see https://github.com/haydenbleasel/favicons#usage
        favicons: {
          mode: 'webapp',
          appName: title,
          appShortName: shortName,
          appDescription: description,
          developerName: 'Antonios Karagiannis',
          developerURL: 'https://antokara.me',
          background: '#c68567',
          theme_color: '#82171d',
          dir: 'auto',
          lang: 'en-US',
          appleStatusBarStyle: 'default',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          version: '1.0',
          logging: false,
          pixel_art: false,
          loadManifestWithCredentials: false,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: true,
            twitter: true,
            yandex: false,
            windows: true
          }
        }
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, 'src/sw.js'),
        swDest: 'sw.js'
      }),
      new webpack.NamedModulesPlugin()
    ]
  };
};
