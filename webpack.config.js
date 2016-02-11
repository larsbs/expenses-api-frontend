const webpack = require('webpack');
const path = require('path');


module.exports = {
  devtools: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    host: 'localhost',
    port: '8080'
  },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment',
      'window.moment': 'moment'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      loaders: [
        'eslint'
      ]
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      loaders: [
        'react-hot',
        'babel'
      ]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /bootstrap\/js\//,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }]
  }
};
