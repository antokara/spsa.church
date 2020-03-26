import { config } from 'dotenv';
import Dotenv from 'dotenv-webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as path from 'path';
import {
  Configuration,
  ContextReplacementPlugin,
  EnvironmentPlugin,
  NamedModulesPlugin,
} from 'webpack';
import { InjectManifest } from 'workbox-webpack-plugin';
import { supportedLocales } from './src/constants/dateFns/supportedLocales';
config();

// plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplatePlugin from 'html-webpack-template';

// constants
const title: string = 'St. Peter & St. Andrew Coptic Orthodox Church';
// const shortName: string = 'spsa.church';
const description: string =
  'Web Application of St. Peter & St. Andrew Coptic Orthodox Church';

// tslint:disable-next-line:max-func-body-length
const common: (env: NodeJS.ProcessEnv) => Configuration = (
  env: NodeJS.ProcessEnv
): Configuration => {
  const environment: string =
    env && env.NODE_ENV ? env.NODE_ENV.toLocaleLowerCase() : 'development';

  return {
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'assets'),
      },
    },
    output: {
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].chunk.js',
      path: path.resolve(__dirname, 'dist'),
    },
    performance: {
      assetFilter: (assetFilename: string): boolean =>
        assetFilename.endsWith('.js'),
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
                    : 'tsconfig.build.json',
              },
            },
          ],
        },
        {
          test: /\.gql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // @see https://date-fns.org/v2.8.1/docs/webpack
      new ContextReplacementPlugin(
        /date\-fns[\/\\]/,
        new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]`)
      ),
      new EnvironmentPlugin({
        NODE_ENV: environment,
        DEBUG: false,
      }),
      new Dotenv({
        path: path.resolve(__dirname, '.env'),
        safe: true,
        systemvars: true,
        silent: true,
      }),
      new HtmlWebpackPlugin({
        title: 'St. Peter & St. Andrew Coptic Orthodox Church',
        minify: false,
        inject: true,
        template: HtmlWebpackTemplatePlugin,
        mobile: true,
        lang: 'en-US',
        appMountId: 'root',
        baseHref: '/',
        bodyHtmlSnippet:
          '<noscript>We are sorry but this Application requires Javascript to be Enabled.</noscript>',
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, 'assets/churchLogo.png'),
        cache: true,
        inject: true,
        prefix: 'assets/',
        mode: 'webapp',
        devMode: 'webapp',
        // @see https://github.com/haydenbleasel/favicons#usage
        favicons: {
          // mode: 'webapp',
          appName: title,
          // appShortName: shortName,
          appDescription: description,
          developerName: 'Antonios Karagiannis',
          developerURL: 'https://antokara.me',
          background: '#c68567',
          theme_color: '#82171d',
          dir: 'auto',
          lang: 'en-US',
          // appleStatusBarStyle: 'default',
          display: 'standalone',
          orientation: 'portrait',
          // scope: '/',
          start_url: '/',
          version: '1.0',
          logging: false,
          pixel_art: false,
          // loadManifestWithCredentials: false,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            // opengraph: true,
            // twitter: true,
            yandex: false,
            windows: true,
          },
        },
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src/sw.js'),
        swDest: 'sw.js',
      }),
      new NamedModulesPlugin(),
    ],
  };
};

// tslint:disable-next-line:no-default-export export-name
export default common;
