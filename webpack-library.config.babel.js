// Webpack v2 configuration
// author: Andras Csizmadia
// see: https://webpack.js.org/configuration/

import path from 'path';
import webpack from 'webpack';

const isDebug = process.argv.includes('-d');
const isRelease = process.argv.includes('-p');
const isVerbose = process.argv.includes('--verbose');

console.log('Running ...');
console.log('Debug: ' + isDebug);
console.log('Release: ' + isRelease);
console.log('Verbose: ' + isVerbose);

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

const config = {
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
      {
        test: /pixi\.js/,
        loader: 'expose-loader?PIXI'
      },
      {
        test: /phaser-split\.js/,
        loader: 'expose-loader?Phaser'
      },
      {
        test: /p2\.js/,
        loader: 'expose-loader?p2'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    },
    unsafeCache: false,
  },
  bail: !isDebug,
  cache: false,
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
  target: 'web',
  entry: {
    library: [
      'babel-polyfill',
      'promise-polyfill',
      'react',
      'react-dom',
      'webfontloader',
      path.resolve(__dirname, 'src/main/library/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: './dist/js/',
    sourcePrefix: '',
    pathinfo: isVerbose,
    filename: !isRelease ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: !isRelease ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    library: 'library',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    new webpack.DllPlugin({
      path: 'dist/js/[name]-manifest.json',
      name: 'library'
    }),
  ],
};

export default config;
