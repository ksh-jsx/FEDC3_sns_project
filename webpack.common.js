const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    //html파일에 JS 번들을 자동으로 묶어주는 플러그인
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
      favicon: './static/images/logo.png',
    }),
    //디렉토리를 카피하여 dist에 들어갈 수 있도록 설정하는 플러그인
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    }),
    //js안에서 호출되는 스타일 코드를 파일로 추출
    isProduction &&
      new MiniCSSExtractPlugin({
        filename: '[name].css',
      }),
    //빌드되고 사용되지 않는 찌꺼기 파일들이나 캐시처럼 남아있는 파일들을 빌드 전에 삭제해주는 플러그인
    new CleanWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          isProduction ? MiniCSSExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        type: 'javascript/auto',
        use: ['@svgr/webpack'],
      },
    ],
  },
};
