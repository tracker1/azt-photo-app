import path from 'path';
import * as db from '../lib/db';
import express from 'express';
import config from '../config';

var images = express();

images.use((err,req,res,next) => {
  console.error('IMAGES ERROR', err);
  var wrapped = Object.assign({}, err, {message:err.message});
  res.status(err && err.status || 500).json({ error: wrapped });
});

images.get('/:name', async function(req,res,next){
  try {
    var record = await db.read(req.params.name);
    if (!record) return res.status(404).send('NOT FOUND');
    res.sendFile(path.join(config.images, record.name));
  } catch(err) {
    console.error(err);
    next(err);
  }
});

export default images;