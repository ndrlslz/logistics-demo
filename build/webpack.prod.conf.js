'use strict'

const { merge } = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: '/logistics-demo/',
    filename: 'js/[name].[contenthash:5].js',
    chunkFilename: 'js/[name].[contenthash:5].chunk.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CleanWebpackPlugin(),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[hash:7].css',
      chunkFilename: 'static/css/[name]-[id]-[hash:7].css',
    }),
    new TerserWebpackPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          hoist_funs: true,
          // drop_console: true,
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 改element ui的样式上需要这个配置，使得:global生效
                mode: 'global',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
})

module.exports = webpackConfig
