const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const srcDir = path.resolve(rootDir, 'src');
const buildDir = path.resolve(rootDir, 'dist');
const entryPath = path.resolve(srcDir, 'index.jsx');
const htmlTemplatePath = path.resolve(srcDir, 'index.html');

module.exports = {
  mode: 'production',
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
        use: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {targets: {browsers: ['>0.25%', 'not ie 11', 'not op_mini all']}},
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['cache-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'cache-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {hack: `true; @import "${antdThemePath}";`},
              javascriptEnabled: true,
            },
          },
        ],
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
    new MiniCssExtractPlugin(),
  ],
};
