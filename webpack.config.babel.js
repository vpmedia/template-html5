// Webpack v2 configuration
// author: Andras Csizmadia
// see: https://webpack.js.org/configuration/
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable new-cap */
import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isDebug = process.argv.includes('-d');
const isRelease = process.argv.includes('-p');
const isVerbose = process.argv.includes('--verbose');

console.log('Building application ...');
console.log(`Debug: ${isDebug}`);
console.log(`Release: ${isRelease}`);
console.log(`Verbose: ${isVerbose}`);

// Phaser webpack config
/* var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js'); */

const config = {
  output: {
    path: path.resolve(__dirname, 'build/js'),
    publicPath: './build/js/',
    sourcePrefix: '',
    pathinfo: isVerbose,
  },
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src/main'),
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  externals: {
    phaser: 'Phaser',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    unsafeCache: isDebug,
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
    client: path.resolve(__dirname, 'src/main/client/app.js'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./build/js/library-manifest.json'),
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./build'],
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    /* new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }), */
    new CopyWebpackPlugin([
    { from: 'resources/js/phaser.js', to: 'phaser.js' },
    { from: 'resources/js/phaser.min.js', to: 'phaser.min.js' }
    ], { ignore: [], copyUnmodified: false }),
  ],
});

const serverConfig = extend(true, {}, config, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, 'src/main/server/index.js'),
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
