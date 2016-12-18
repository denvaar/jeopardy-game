var webpack = require('webpack');

module.exports = { 
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: 'bundle.js',
    //publicPath: 'http://localhost:3000/',
    //path: './'
    publicPath: '../built/',
    path: './built/'
  },  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    })
  ],
  module: {
    loaders: [
      {   
        test: /\.js?|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'] 
      },  
      {
        test: /\.(png|jpg|gif|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {   
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.ttf$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
};

