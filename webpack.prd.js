const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
  commonConfiguration,
  {
    mode: 'production',
    output: {
      filename: '[name]',
      path: path.resolve(__dirname, 'dist')
    }
  }
)