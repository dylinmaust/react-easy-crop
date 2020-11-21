const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'examples/src/index.html'),
  filename: './index.html',
})

module.exports = {
  entry: path.join(__dirname, 'examples/src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        include: [path.resolve('./example')],
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.css$/, include: [path.resolve('./src')], use: 'raw-loader' },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new CopyWebpackPlugin({patterns: [{ from: 'examples/src/images', to: 'images' }]}),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories'
  }
  },
  devServer: {
    port: 3001,
  },
}
