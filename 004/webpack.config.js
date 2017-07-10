const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.
  devServer: {
    host: process.env.HOST,
    port: 80,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          //会将错误信息抛出到页面中显示
          emitWarning: true,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        //use配置项的顺序有要求，是从右到左加载处理的，因而数组中要先写style-loader，再到css-loader
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //配置为true时 -> 不同.css文件会处于不同的模块当中，避免产生命名冲突
              modules: true
            }
          } 
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
  ],
};
