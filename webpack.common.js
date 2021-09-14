const path = require('path')
const glob = require('glob')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const scriptDir = './src'
const htmlDir = './src/pages'
const entries = {}

glob.sync('**/*.js', {
  // ignore: '**/_*.js' // 除外したいやつ
  cwd: scriptDir
}).map((key) => {
  entries[key] = path.resolve(scriptDir, key)
})

const htmlEntries = glob.sync('**/*.html', {
  cwd: htmlDir
}).map((key) => {
  // optionはここ
  // https://github.com/jantimon/html-webpack-plugin#options
  return new HTMLPlugin({
    inject: false, // 全てのjsを注入しない
    filename: key,
    template: path.join(__dirname, `${htmlDir}/${key}`),
  })
})

const plugins = htmlEntries
const cleanPlugin = new CleanWebpackPlugin()
const copyPlugin = new CopyPlugin({
  patterns: [
    { from: './src/static', to: path.resolve(__dirname, 'dist') },
  ]
})
plugins.push(copyPlugin)
plugins.unshift(cleanPlugin)

module.exports = {
  entry: entries,
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
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
}