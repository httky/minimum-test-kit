const path = require('path')
const glob = require('glob')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const scriptDir = '../src'
const htmlDir = '../src/pages'
const entries = {}

glob.sync('**/*.js', {
  // ignore: '**/_*.js' // 除外したいやつ
  cwd: path.resolve(__dirname, `${scriptDir}`)
}).map((fileName) => {
  entries[`${fileName.replace(/.js$/, '')}`] = path.resolve(__dirname, `${scriptDir}/${fileName}`)
})

const htmlEntries = glob.sync('**/*.html', {
  cwd: path.resolve(__dirname, `${htmlDir}`)
}).map((fileName) => {
  // optionはここ
  // https://github.com/jantimon/html-webpack-plugin#options
  return new HTMLPlugin({
    inject: false, // 全てのjsを注入しない
    filename: fileName,
    template: path.join(__dirname, `${htmlDir}/${fileName}`),
  })
})

const plugins = htmlEntries
const copyPlugin = new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, '../src/static'),
      // to: path.resolve(__dirname, 'dist')
    },
  ]
})
plugins.push(copyPlugin)

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
