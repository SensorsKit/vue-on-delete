const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './lib'),
    publicPath: '/lib/',
    filename: 'vue-on-delete.js',
    library: 'VueOnDelete',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        type: 'javascript/esm',
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: false
}
