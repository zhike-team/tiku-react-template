import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import { port } from '../src/common/config';

const app = express();

if (process.argv[2] === 'development') {
  const webpackConfig = require('../build/webpack.dev');
  const compiler = webpack(webpackConfig);
  app.use(require('connect-history-api-fallback')());
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../dist'),
  }));
  app.use(require("webpack-hot-middleware")(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    fs.readFile(path.resolve(__dirname, '../dist/index.html'), (err, data) => {
      res.end(data);
    });
  });
}

app.listen(port, () => {
  console.log(`🚀  题库项目已进入战斗状态，监听端口: ${port}`);
});
