import config from '../config';
import fs from 'fs';
import {sleep, exists} from './utils';

import * as directions from './directions';
import * as fd from './file-data';
import * as pd from './photo'

import { photoData, findPhoto } from './photo';
import { findPhotoLocation } from './photo-location';

async function patchRecord(r) {
  var log = (...args) => (r.name !== 'IMG_305.jpg') ? null : console.log(...args);

  // data from file data
  let tmp = await fd.find(r.name);
  if (tmp) r = Object.assign(r, tmp);

  // location data from image
  delete fd.location; //remove old location(s)
  tmp = await findPhotoLocation(r);
  if (tmp) r = Object.assign(r, tmp);

  //direction from direction csv
  tmp = await directions.find(r.name);
  if (tmp) r.direction = tmp;

  return r;
}

async function loadRawData() {
  var changed = false;
  let d = await photoData();

  let ret = [];
  for (let r of d) ret.push(await patchRecord(r));

  await fd.save(ret);
  return ret;
}


var _data;
export async function list() {
  if (!_data) _data = loadRawData();
  return await _data;
}

export async function find(name) {
  const id = (name || '').trim().toLowerCase();
  const d = await list();
  var p = d.filter(p => p.id === id)[0] || null;
}

export async function write(name, record) {
  const id = (name || '').trim().toLowerCase();
  const d = (await list())
    .map(p => {
      if (p.id !== id) return p;
      return record;
    });
  _data = Promise.resolve(d);
  await fd.save(d);
}

export async function read(name) {
  const id = (name || '').trim().toLowerCase();
  const d = await list();
  return d.filter(p => p.id === id)[0] || null;
}