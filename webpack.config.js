// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  entry: './index.ts', //エントリポイント。依存関係整理の起点にするファイル。
  output: {
    path: path.resolve(__dirname, 'dist'), //distというディレクトリに生成する
    filename: 'bundle.js', //バンドルして書き出すファイル名
  },
  module: {
    rules: [
      //.tsがケツにつくファイルを探索し、TypeScriptとして読み込む(ts-loader)
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: '/node_modules/',
      },
      //phaser-hogehoge.jsというファイルの内容はPhaserというグローバル変数に内容を突っ込む(expose-loader)
      {
        test: /phaser\.js$/,
        use: [
          {
            loader: 'expose-loader?Phaser',
            options: {
              exposes: 'phaser',
            },
          },
        ],
      },
    ],
  },
  //開発用サーバを立てるときの設定
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    devMiddleware: {
      publicPath: '/dist/',
    },
    host: '0.0.0.0',
    port: 8080,
    open: true,
  },

  resolve: {
    //バンドル対象にするファイルを指定する
    extensions: ['.ts', '.js'],
    //import "phaser"ってしたときに読み込みに行くやつを指定する
    alias: {
      phaser: phaser,
    },
  },
};
