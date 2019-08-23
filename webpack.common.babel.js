/* eslint-disable import/no-extraneous-dependencies */
import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: join(__dirname, '/src/main.js'),
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.+)?$/,
        loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '/src/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin(['assets/static'])
  ],

  output: {
    path: join(__dirname, '/dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      react: join(__dirname, '/node_modules/react')
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  }
};
