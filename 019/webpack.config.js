const path = require('path');
//自动生成index.html并将打包后的js引入的插件
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离.css到独立文件的插件，不安装此插件则css会放在.js中去加载，容易造成flash
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//压缩文件的插件
const BabiliPlugin = require('babili-webpack-plugin');
//优化(optimize)并分离打包项目代码和组件代码
const webpack = require('webpack');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

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
    hotOnly: true //HMR
  },
  //检测文件大小
  performance: {
    hints: 'warning',//'error'
    maxEntrypointSize: 500000,//Bytes
    maxAssetSize: 450000//Bytes
  },
  devtool: 'source-map',
  entry: {
    //app: PATHS.app,
    index: './app/index.js',
    about: './app/about.js',
    //配置第三方的包
    vendor: ['react']
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
          emitWarning: true,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        //use配置项的顺序有要求，是从右到左加载处理的，因而数组中要先写style-loader，再到css-loader
        //use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       //配置为true时 -> 不同.css文件会处于不同的模块当中，避免产生命名冲突
        //       modules: true,
        //     },
        //   }, 
        //],
        use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          fallback: 'style-loader'
        })
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Webpack demo',
    // }),
    plugin,
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    //HMR --hot
    new webpack.HotModuleReplacementPlugin()
  ],
};
