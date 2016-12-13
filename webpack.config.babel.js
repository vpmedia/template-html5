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
  // Don't attempt to continue if there are any errors.
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
  // Watch for changes
  watch: isDebug,
};

const clientConfig = extend(true, {}, config, {
  entry: {
    client: path.resolve(__dirname, 'src/main/client/app.js')
  },
  output: {
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },
  target: 'web',
  plugins: [
    // Local development server with auto updates
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./dist']
      }
    }),
    // Define free variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
  ],
});

const serverConfig = extend(true, {}, config, {
  entry: {
    client: path.resolve(__dirname, 'src/main/server/index.js')
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  plugins: [
    // Define free variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),
    // Do not create separate chunks of the server bundle
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // Adds a banner to the top of each generated chunk
    //new webpack.BannerPlugin('require("source-map-support").install();',
    //  { raw: true, entryOnly: false }),
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
