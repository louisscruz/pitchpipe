const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    './Root.jsx'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    preloaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },

      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
