import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
//import AssetsPlugin from 'assets-webpack-plugin';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    sourcePrefix: '',
    pathinfo: isVerbose,
  },
  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),
    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    ...isDebug ? [] : [
      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurrenceOrderPlugin(true),

      // Search for equal or similar files and deduplicate them in the output
      // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new webpack.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],
  ],
  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
  module: {
    loaders: [
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
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  debug: isDebug,
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
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    // Do not create separate chunks of the server bundle
    // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
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
