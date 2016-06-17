import path from 'path';
import fs from 'fs';
import config from '../config';
import exif from './exif';
import BigNumber from 'bignumber.js';
import geohash from 'geohash.js';

async function getPhotoList() {
  var list = (await fs.readdir.promise(config.images))
    .filter(f => (/^IMG_\d+\.jpg$/i).test(f))
    .map(f => ({
      id: f.trim().toLowerCase(),
      name: f,
      path: path.resolve(config.images, f),
      num: f.match(/\d+/)[0],
      details: null,
    }))
    .sort((a,b) => (a.num - b.num))
    .map((f, i) => Object.assign(f, {number: i+1}));

  for (const key in Object.keys(list)) {
    list[key] = await loadDetails(list[key]);
  }

  return list.reduce((p,f) => Object.assign(p, { [f.id]: f }), {});
}

let _photos = null
export function getPhotos() {
  if (_photos) return _photos;
  return _photos = getPhotoList();
}

function formatReading([degrees, minutes, seconds], ref) {
  return [
    degrees+ '\u00B0',
    minutes + '"',
    seconds + '\'',
    ref
  ].join(' ');
}

function ConvertDMSToDD([degrees, minutes, seconds], direction) {
  let dd = (new BigNumber(degrees)).dividedBy(60).plus(minutes).dividedBy(60).plus(degrees);

  if (direction == "S" || direction == "W") {
    dd = dd.times(-1);
  }

  // Don't do anything for N or E
  return dd.toNumber(5); //roughly 1.1meter or better
}

export async function loadDetails(photo) {
  if (photo && photo.location) return photo;

  // Get GPS/Exif data
  const exifData = await exif(photo.path);

  let longitude = null;
  let latitude = null;
  let fmt = null;
  let gh = null;

  try {
    longitude = exifData && exifData.gps && ConvertDMSToDD(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef) || null;
    latitude = exifData && exifData.gps && ConvertDMSToDD(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef) || null;
    fmt = longitude && latitude && `${formatReading(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef)} and ${formatReading(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef)}`
    gh = geohash.encode(latitude, longitude).substr(0,10);
  } catch(err) {
    console.log(photo.name, exifData);
  }

  return { ...photo, location: { longitude:longitude && longitude.toFixed(5), latitude: latitude && latitude.toFixed(5), formatted: fmt, geohash:gh } };
}
