const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  target: 'electron',
  output: {
    filename: 'bundle.js',
    publicPath: path.join(__dirname, 'built'),
    path: path.join(__dirname, 'built')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    rules: [{
      test: /\.js?|\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [
        { loader: 'file-loader' }
      ]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: [
        {
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }
      ]
    }
    ]
  }
};

