import path from 'path';
import exif from './exif';
import BigNumber from 'bignumber.js';
import geohash from 'geohash.js';
import fs from 'fs';
import config from '../config';

function basicInfo(name) {
  if (!(/^IMG_\d+\.jpg$/i).test(name)) return null;
  return {
    id: name.trim().toLowerCase(),
    name,
    path: path.resolve(config.images, name),
    num: name.match(/\d+/)[0]
  };
}

async function getList() {
  return (await fs.readdir.promise(config.images))
    .map(f => basicInfo(f))
    .filter(f => f != null)
    .sort((a,b) => (a.num - b.num))
    .map((f, i) => ({ ...f, number: i+1 }));
}

let _photos = null;
export async function photoData() {
  if (_photos) return _photos;
  return _photos = getList();
}


export async function findPhoto(name) {
  const data = await photoList();
  const id = (name || '').toString().trim().toLowerCase();
  return data.filter(p => p.id === id)[0] || null;
}