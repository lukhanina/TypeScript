const path = require('path');
const HtmlWebpackPlagin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    assetModuleFilename: 'img/[name][ext]'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/[name]'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlagin({
      template: './src/index.html',
      filename: 'index.html',
      excludeChunks: ['server']
    })
  ],
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    open: false,
    proxy: {
      '/api': {
        target: "http://localhost:3000/",
        pathRewrite: { '/^api': ''},
        secure: false,
        changeOrigin: true
      }
    }
  }
}
