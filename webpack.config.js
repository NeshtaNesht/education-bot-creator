const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  mode: 'development',
  target: 'web',
  devServer: {
    open: true,
    port: 80,
    host: 'localhost',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    // path: path.resolve(__dirname, './build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.VK_APP_ID': JSON.stringify(process.env.VK_APP_ID),
      'process.env.SECRET_KEY': JSON.stringify(process.env.SECRET_KEY),
      'process.env.SERVICE_KEY': JSON.stringify(process.env.SERVICE_KEY),
      'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
      'process.env.REDIRECT_URI': JSON.stringify(process.env.REDIRECT_URI),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REDIRECT_URI_GROUP': JSON.stringify(
        process.env.REDIRECT_URI_GROUP
      ),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
