const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'production'
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'

const webpackConfig = {
  context: path.join(__dirname, 'src'),

  entry: {
    'src': ['webpack-dev-server/client', 'webpack/hot/dev-server', './index.js']
  },

  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/build/',
    filename: 'build.js'
  },

  mode: NODE_ENV,

  devtool: isDev ? 'source-map' : false,

  watch: false,

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDev)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },

  devServer: {
    port: 9000,
    contentBase: __dirname,
    publicPath: '/build/',
    hot: true
  }
}

if (isProd) {
  webpackConfig.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }
      })
    ]
  }
}

module.exports = webpackConfig
