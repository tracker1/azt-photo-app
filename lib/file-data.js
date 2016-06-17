import fs from 'fs';
import config from '../config';
import {sleep, exists} from './utils';

async function loadDataFromFile() {
  var haveData = await exists(config.data);
  if (!haveData) return [];

  //read file, and parse
  var text = await fs.readFile.promise(config.data, 'utf8');

  if (text && text.length) {
    return text
      .split(/\n/g)
      .map(l => JSON.parse(l));
  }
  return [];
}

let _loader = null;
export async function load() {
  try {
    if (!_loader) _loader = loadDataFromFile();
    return await _loader;
  } catch(err) {
    console.error('ERROR Loading file-data loader \n\t', config.data, '\n', err);
    alert('Error loading data.');
    _loader = null;
    return [];
  }
}

export async function find(name) {
  var data = await load();
  return data.filter(p => p.id === name.trim().toLowerCase())[0] || null;
}

var _writing = null;
var _writeNext = null;
export async function save(list) {
  _writeNext = list;
  if (_writing) {
    _loader = Promise.resolve(list);
    await _writing;
  }
  while (_writing) await sleep(0);
  try {
    if (!_writeNext) return;
    _writing = fs.writeFile.promise(
      config.data,
      _writeNext.map(i => JSON.stringify(i)).join('\n')
    );
    _writeNext = null;
    await _writing;
    _writing = null;
  } catch(err) {
    _writing = null;
    throw err;
  }
}
