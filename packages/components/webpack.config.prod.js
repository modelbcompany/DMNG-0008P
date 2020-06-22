/* eslint-disable @typescript-eslint/no-var-requires */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')
const webpackDevConfig = require('./webpack.config.dev')
const mergeWebpack = require('webpack-merge')

/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * @file Webpack Production Configuration
 * @see {@link https://webpack.js.org/configuration}
 */

/* eslint-disable sort-keys */

module.exports = mergeWebpack(webpackDevConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.STORYBOOK_API_URL': "'https://woodmontapi/modelb.now.sh'"
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/woodmont.css'
    })
  ]
})

/* eslint-enable sort-keys */
