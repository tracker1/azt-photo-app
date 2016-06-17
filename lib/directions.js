import config from '../config';
import path from 'path';
import fs from 'fs';
import parse from 'csv-parse';
import {sleep, exists} from './utils';

async function loadData() {
  var haveData = await exists(config.directions)
  if (!haveData) return [];

  var text = await fs.readFile.promise(config.directions, 'utf8');
  var rows = await parse.promise(text);
  return rows;
}

let _data = null;
export function data() {
  if (_data) return _data;
  return _data = loadData().catch(err => {
    _data = null;
    throw err;
  });
}

export async function find(name) {
  var rows = await data();
  if (!rows || !rows.length) return null;
  for (var k of rows) {
    if ((k[0] || '').trim().toLowerCase() === (name || '').trim().toLowerCase()) {
      return k[1];
    }
  }
  return null;
}