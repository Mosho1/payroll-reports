/**
 * Webpack Dev Server
 * This file is used to run our local enviroment
 */
const webpack = require('webpack');
const express = require('express');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.config');
const proxy = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

const env = {
  dev: process.env.NODE_ENV === 'development',
  port
};

const devServerConfig = {};

try {
  const app = express();
  const compiler = webpack(webpackConfig(env));
  const devMiddleware = WebpackDevMiddleware(compiler, devServerConfig);
  const hotMiddleware = WebpackHotMiddleware(compiler);
  app.use('/graphql', proxy({target: backendUrl, changeOrigin: true}));
  app.use(history());
  app.use(devMiddleware);
  app.use(hotMiddleware);
  app.listen(port, 'localhost', err => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening to port ${port}`);
  });
} catch (e) {
  console.error(e);
}


