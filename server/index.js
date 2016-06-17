global.Promise = require('bluebird');

import '../lib/promisify';
import path from 'path';
import express from 'express';
import compression from 'compression';
import api from './api';
import images from './images';
import * as db from '../lib/db';

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

export async function main() {
  console.log('Loading image data...');
  await db.data();
  console.log('Image Data Loaded');

  let message = `Listening on port ${PORT}! - http://localhost:${PORT}`;
  var app = express();

  if (isProd) app.use(compression({
    level: 9,
    filter: (req, res) => {
      //compress api responses - may look like images in url
      if ((/^\/api\//).test(req.path)) return true;

      //don't compress images
      if ((/^\/(gif|jpg|jpeg|png)$/).test(req.path)) return false;

      //compress everything else
      return true;
    }
  }));

  app.use('/api/v1', api);
  app.use('/images', images);

  app.use(function(err,req,res,next){
    console.error('SERVER ERROR', err.message, err.stack);
    res.status(500).json({error:{message:err.message}});
  });

  app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname, '../shared/index.html'));
  });

  if (isProd) {
    // PRODUCTION MODE
    app.use('/client', express.static(path.resolve(__dirname, '../client')));
  } else {
    // DEV MODE
    message += ' - wait for webpack bundle to connect.'

    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.babel');
    const compiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(require("webpack-hot-middleware")(compiler));
  }

  // anything under shared is rooted with the app
  app.use('/', express.static(path.resolve(__dirname, '../shared')));

  app.listen(3000, function () {
    console.log(message);
  });
}

main().catch(err => {
  console.error('FATAL_ERROR', err);
  process.exit(1);
})