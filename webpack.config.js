const path = require('path');

module.exports = {
  mode: 'production',
  entry: './includes/modules/ArticleDetective/ArticleDetectiveModule.jsx',
  output: {
    filename: 'article-detective.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: 'source-map'
};
