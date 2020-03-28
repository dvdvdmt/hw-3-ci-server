const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const srcDir = path.resolve(rootDir, 'src');
const buildDir = path.resolve(rootDir, 'dist');
const entryPath = path.resolve(srcDir, 'index.jsx');
const htmlTemplatePath = path.resolve(srcDir, 'index.html');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: entryPath,
  output: {
    filename: 'bundle.js',
    path: buildDir,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['cache-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['cache-loader', 'svg-sprite-loader'],
        exclude: /assets/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['file-loader'],
        include: /assets/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({template: htmlTemplatePath}),
    new CopyWebpackPlugin(
      [
        {
          from: publicDir,
        },
      ],
      {copyUnmodified: true}
    ),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  devServer: {
    contentBase: buildDir,
    hot: true,
    port: 4000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
};
