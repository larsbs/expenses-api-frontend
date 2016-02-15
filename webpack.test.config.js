const path = require('path');


module.exports = {
  devtools: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    'mocha!./test/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8081/dist/',
    filename: 'test.bundle.js'
  },
  devServer: {
    host: 'localhost',
    port: '8081'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      include: [
        path.join(__dirname, 'app'),
        path.join(__dirname, 'test')
      ],
      loaders: [
        'eslint'
      ]
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, 'app'),
        path.join(__dirname, 'test')
      ],
      loaders: [
        'babel'
      ]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
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
