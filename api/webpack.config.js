// const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './index.js',
  target: 'node',
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    port: 8081,
    host: '192.168.0.102',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: process.env.NODE_ENV === 'development' ? './.env.dev' : './.env',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'server.js',
  },
};
