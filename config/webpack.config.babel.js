import webpack from 'webpack';
import { execSync } from 'child_process';
import path from 'path';

const DEBUG = process.env.NODE_ENV === 'development';
const exec = command => execSync(command, { encoding: 'utf8' });
const GIT_BRANCH = exec('git rev-parse --abbrev-ref HEAD');
const GIT_COMMIT = exec('git rev-parse --short HEAD');
const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      DATA_SOURCE: JSON.stringify(process.env.DATA_SOURCE),
      GIT_BRANCH: JSON.stringify(GIT_BRANCH),
      GIT_COMMIT: JSON.stringify(GIT_COMMIT)
    }
  })
];

module.exports = {
  devtool: DEBUG ? 'inline-sourcemap' : false,
  entry: DEBUG
    ? [
        'babel-polyfill',
        'eventsource-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/test/resources/js/index'
      ]
    : ['babel-polyfill', 'eventsource-polyfill', './src/main/js/index'],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.*css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'target/js'),
    publicPath: '/js',
    filename: 'bundle.js'
  },
  plugins: DEBUG
    ? [...commonPlugins, new webpack.HotModuleReplacementPlugin()]
    : [
        ...commonPlugins
        new webpack.optimize.UglifyJsPlugin({ sourcemap: false })
      ],
  devServer: {
    port: 8081,
    inline: true,
    hot: true,
    open: true,
    historyApiFallback: true,
    contentBase: 'src/main/public',
    stats: {
      chunkModules: false
    },
    proxy: {
      '/ui': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/ui': ''
        }
      },
      '/api-service': {
        target: 'http://localhost:8080',
        logLevel: 'info'
      }
    }
  }
};
