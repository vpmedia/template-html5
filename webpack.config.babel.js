import path from 'path';
//import webpack from 'webpack';
//import extend from 'extend';
//import AssetsPlugin from 'assets-webpack-plugin';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

const config = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    sourcePrefix: '  ',
    pathinfo: isVerbose,
    filename: 'client-bundle.js',
  },
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main/client/app.js')
    ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
export default config;
