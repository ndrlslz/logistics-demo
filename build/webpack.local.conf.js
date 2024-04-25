const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const pathConfig = require('./path')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: pathConfig[process.env.NODE_ENV || 'local'].outputPath,
  },
  devtool: 'cheap-eval-eval-source-map',
  // these devServer options should be customized in /config/index.js
  devServer: {
    open: true,
    hot: true,
    port: 8888,
    historyApiFallback: true,
    proxy: {
      '/logistics-demo-api/api/': {
        target: 'https://b2b-dev.digitalshell.com.cn/',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$|\.scss$/,
        use: [
          'vue-style-loader',
          'thread-loader',
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
