import * as db from '../lib/db';
import express from 'express';
import bodyParser from 'body-parser';

var api = express();

api.use(bodyParser.json({ type: 'application/json' }));

api.use((req,res,next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

api.use((err,req,res,next) => {
  console.error('API ERROR', err);
  var wrapped = Object.assign({}, err, {message:err.message});
  res.status(err && err.status || 500).json({ error: wrapped });
});

api.get('/image/:name', async function(req,res,next){
  try {
    var record = await db.read(req.params.name);
    if (!record) return res.status(404).json({image:null});
    return res.json({image:record});
  } catch(err) {
    console.error(err);
    next(err);
  }
});

api.post('/image/:name', async function(req, res, next){
  try {
    //await db.write(name, )
    var record = await db.read(req.params.name);
    if (!record) return res.status(404).json({error:{message:'not found'}});
    await db.write(req.params.name, req.body);
    return res.json({success:true});
  } catch(err) {
    next(err)
  }
});

api.get('/image', async function(req,res){
  var list = await db.list();
  res.json({list});
});

export default api;