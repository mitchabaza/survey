var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js' 
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
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
