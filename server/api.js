import * as db from '../lib/db';
import express from 'express';
import bodyParser from 'body-parser';
import csvWriter from 'csv-write-stream';

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
  var d = await db.list();
  var list = d.map(({name, isSign, isGate, isRoad}) => ({name, isSign, isGate, isRoad}));
  res.json({list});
});

function normalize(data) {
  if (data === null || data === undefined) return '';
  return data;
}

function sendCsv(name, res, fields, data) {
  const filename = `${name} - ${new Date().toISOString().replace('T','_').replace(/\:/g,'').substr(0,17)}.csv`;
  console.log('sending', filename, data && data.length, 'records');
  var writer = csvWriter()

  res.attachment(filename);

  writer.pipe(res);
  data.forEach(p => {
    const item = fields.reduce((o,f) => ({ ...o, [f]: normalize(p[f]) }), {})
    //console.log(item);
    writer.write(item);
  });
  //console.log('end');
  writer.end();
}

api.get('/list/sign', async function(req, res){
  var writer
  var d = await db.list();
  sendCsv(
    'AZT Sign Inventory',
    res,
    [
      'name',
      'latitude',
      'longitude',
      'direction',
      'signSubject',
      'signMaterial',
      'notes',
    ],
    d.filter(p => p.isSign)
  );
});

api.get('/list/gate', async function(req, res){
  var d = (await db.list()).filter(p => p.isGate);
  sendCsv(
    'AZT Gate Inventory',
    res,
    [
      'name',
      'latitude',
      'longitude',
      'direction',
      'gateType',
      'notes',
    ],
    d
  );
});

api.get('/list/road', async function(req, res){
  var d = (await db.list()).filter(p => p.isRoad);
  sendCsv(
    'AZT Road Crossing Inventory',
    res,
    [
      'name',
      'latitude',
      'longitude',
      'direction',
      'roadType',
      'roadLevel',
      'roadMotorized',
      'roadSafetyConsiderations',
      'notes',
    ],
    d
  );
});

api.get('/list', async function(req, res){
  var d = await db.list();
  sendCsv(
    'AZT Signage Detail',
    res,
    [
      'name',
      'latitude',
      'longitude',
      'direction',
      'signSubject',
      'signMaterial',
      'gateType',
      'roadType',
      'roadLevel',
      'roadMotorized',
      'roadSafetyConsiderations',
      'notes',
    ],
    d
  );
});


export default api;