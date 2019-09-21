import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import common from './webpack.common.babel';

export default merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), new CopyWebpackPlugin(['public'])],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // creates style nodes from JS strings
          { loader: 'css-loader' }, // translates CSS into CommonJS
          { loader: 'sass-loader' } // compiles Sass to CSS
        ]
      }
    ]
  }
});
