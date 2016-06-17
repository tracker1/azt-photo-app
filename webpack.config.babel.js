import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const ENV = process.env.NODE_ENV || 'development';

const stylesCss = new ExtractTextPlugin('app.css');

module.exports = {
  entry: {
    app: (
      ENV === 'production'
    ? []
    : [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
    ]
    ).concat([path.resolve('./client/index.js')])
  },

  output: {
    path: path.resolve(__dirname, './dist/client'),
    publicPath: '/client/',
    filename: 'app.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    alias: {
      style: `${__dirname}/client/style`,
      lib: `${__dirname}/lib`,
      shared: `${__dirname}/shared`,
      client: `${__dirname}/client`,
      feature: `${__dirname}/client/feature`,
      actions: '${__dirname}/client/actions'
    }
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /client\//,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'].concat(
            ENV === 'production'
            ? []
            : ['react-hmre']
          ),
          plugins: [
            'transform-decorators-legacy',
            'transform-runtime',
          ]
        }
      },
      {
        test: /.(sass|scss|css)$/,
        loader: ENV === 'production' ?
          stylesCss.extract('css?sourceMap!postcss!sass?sourceMap') :
          'style!css?sourceMap!postcss!sass?sourceMap'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(xml|html|txt)$/,
        loader: 'raw'
      },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?name=fonts/[name]_[hash:base64:5].[ext]&limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name]_[hash:base64:5].[ext]' },
      { test: /\.(gif|jpg|jpeg|png)?$/, loader: 'file-loader?name=images/[name]_[hash:base64:5].[ext]' },
    ]
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'client/feature/style'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 5 versions' })
  ],

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      Component: 'react/lib/ReactComponent',
      Promise: 'bluebird'
    }),
  ]).concat(
    ENV === 'production'
    ? [
      stylesCss,
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: true,
        comments: false,
      }),
    ]
    : [
      new webpack.HotModuleReplacementPlugin()
    ]
  ),

  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false
  },

  devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',
};