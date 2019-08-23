import merge from 'webpack-merge';
import common from './webpack.common.babel';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader', 'eslint-loader']
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
