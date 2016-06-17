import config from '../config';
import fs from 'fs';
import {sleep, exists} from './utils';
import {getPhotos, loadDetails} from './photos';
import * as directions from './directions';

async function loadFromPhotos() {
  var data = await getPhotos();
  await saveAll(data);
  return data;
}

async function loadData() {
  try {
    //if file doesn't exist, use getPhotos() data
    var haveData = await exists(config.data);
    if (!haveData) return await loadFromPhotos();

    // read file, and parse data
    var text = await fs.readFile.promise(config.data, 'utf8');

    if (text && text.length) return text
      .split(/\n/g)
      .map(l => JSON.parse(l))
      .reduce((p,f) => Object.assign(p, {[f.id]:f}), {});
  } catch(err) {
    console.error('error loading data', err);
    throw err;
  }
}

let _loader = null;
export function data() {
  var modified = false;
  if (_loader) return _loader;
  return _loader = loadData()
  .then(async (data) => {
    var keys = Object.keys(data);
    for (let k of Object.keys(data)) {
      var img = data[k];
      //console.log(k, data[k]);
      if (!img.direction) {
        img.direction = await directions.find(img.name);
        if (img.direction) modified = true;
      }
    }
    if (modified) {
      saveAll(data);
    }
    return data;
  })
  .catch(err => {
    _loader = null;
    throw err;
  });
}

export function reset() {
  _loader = null;
  _data = null;
}


var _writing = null;
async function saveAll(d) {
  if (_writing) await _writing;
  while (_writing) await sleep(0);
  try {
    _writing = fs.writeFile.promise(
      config.data,
      Object
        .keys(d)
        .map(k => JSON.stringify(d[k]))
        .join('\n')
    );
    await _writing;
    _writing = null;
  } catch(err) {
    _writing = null;
    throw err;
  }
}

export async function write(name, record) {
  const id = (name || '').trim().toLowerCase();
  const d = await data();
  d[id] = record;
  //console.info('saving', id, record);
  saveAll(d);
}

//list of photos
export async function list() {
  // canonical list based on
  var photos = await getPhotos();
  return Object.keys(photos).map(k => photos[k].name);
}


export async function read(name) {
  let record = null;
  const id = (name || '').trim().toLowerCase();
  if (!id) return null;

  let d = await data();
  if (!d) return null; //nothing to see here

  record = d[id];
  if (!record) {
    d = await getPhotos();
    record = d[id];
    if (record) await write(id, record);
  }
  if (!d[id]) return null;

  return record;
}