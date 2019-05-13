const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.js',
  target: 'web',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '../src'),
        ],
        use: ['babel-loader'],
      }, {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4 * 1024,
          },
        }],
      }, {
        test: /\.mp3$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '../dist/[name].[ext]',
          },
        }],
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(__dirname, './index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './favicon.ico'),
        to: path.resolve(__dirname, '../dist/favicon.ico'),
      },
      {
        from: path.resolve(__dirname, './sa.prod.js'),
        to: path.resolve(__dirname, '../dist/sa.js'),
      },
    ]),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
