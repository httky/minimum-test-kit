const path = require('path')

module.exports = env => {
  const MODE = env
  const enabledSourceMap = MODE === "development"

  return {
    mode: MODE,
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: enabledSourceMap
              }
            }
          ]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist')
    }
  }
}