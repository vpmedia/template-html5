// Webpack v2 configuration
// author: Andras Csizmadia
// see: https://webpack.js.org/configuration/

import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import webpackLoadPlugins from 'webpack-load-plugins';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const plugins = webpackLoadPlugins();

const isDebug = !process.argv.includes('-p');
const isVerbose = process.argv.includes('--verbose');

console.log('Running ...');
console.log('Debug: ' + isDebug);
console.log('Verbose: ' + isVerbose);

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    sourcePrefix: '',
    pathinfo: isVerbose,
  },
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src/main'),
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.coffee'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  bail: !isDebug,
  cache: isDebug,
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
  watch: isDebug,
};

const clientConfig = extend(true, {}, config, {
  target: 'web',
  entry: {
    client: path.resolve(__dirname, 'src/main/client/app.js')
  },
  output: {
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./dist']
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
  ],
});

const serverConfig = extend(true, {}, config, {
  target: 'node',
  entry: {
    client: path.resolve(__dirname, 'src/main/server/index.js')
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
});

export default [clientConfig, serverConfig];
