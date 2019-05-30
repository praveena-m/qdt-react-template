const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            '@babel/plugin-transform-runtime', 
            '@babel/plugin-proposal-object-rest-spread']
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          fix: true
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ],
      },    
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },  
      }, 
    ],
  },
  plugins: [
    function() {
        this.plugin('watch-run', function(watching, callback) {
            let date = new Date();
            let displayDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            console.log('\x1b[36m%s\x1b[0m', `----------------------------`);
            console.log('\x1b[36m%s\x1b[0m', `Start compiling at ${displayDate}`);  //cyan
            console.log('\x1b[36m%s\x1b[0m', `----------------------------`);
            callback();
        })
    },
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        uglifyOptions: {
          warnings: true,
          parse: {},
          compress: false,
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
