const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'source-map',
  entry: './browser/app.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'graphql-demo.js'
  },
  externals: [
    'canvas', 'jsdom'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: [
            "transform-es2015-block-scoping",
            "transform-class-properties",
            "transform-es2015-computed-properties"
          ]
        }
      },
      {
        test: /\.scss$/,
        include: /scss/,
        loaders: ['css', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded']
      },
      { test: /\.json$/, loaders: ['json']},
      { test: /\.(jpe?g|gif|png|ico|svg)$/i, loader:'url-loader?limit=1024&name=images/[name].[ext]' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css")},
      { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/i, loader: 'url-loader?limit=10240&name=../fonts/[name].[ext]' }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/chainedCommentsStyle.css', {allChunks: true}),
  ]
};
module.exports = config;
