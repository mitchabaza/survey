var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, '../server/public/'),
    filename: 'bundle.js' 
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel?presets[]=react,presets[]=es2015,plugins[]=transform-class-properties'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
