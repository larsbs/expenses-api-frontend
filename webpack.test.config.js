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
      test: /\.js$/,
      include: [
        path.join(__dirname, 'app'),
        path.join(__dirname, 'test')
      ],
      loaders: [
        'babel'
      ]
    }]
  }
};
