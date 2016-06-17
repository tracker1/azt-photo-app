import path from 'path';
import exif from './exif';
import BigNumber from 'bignumber.js';
import config from '../config';

import geohash from 'geohash.js';

function formatReading([degrees, minutes, seconds], ref) {
  return [
    degrees+ '\u00B0',
    minutes + '"',
    seconds + '\'',
    ref
  ].join(' ');
}

function ConvertDMSToDD([degrees, minutes, seconds], direction) {
  let dd = new BigNumber(seconds).dividedBy(60).plus(minutes).dividedBy(60).plus(degrees);

  if (direction == "S" || direction == "W") {
    dd = dd.times(-1);
  }

  // Don't do anything for N or E
  return dd.toFixed(8); //roughly 1.1meter or better
}

export async function findPhotoLocation({path, latitude, longitude}) {
  if (latitude && longitude) return null;

  // Get GPS/Exif data
  const exifData = await exif(path);

  if (!(
    exifData
    && exifData.gps
    && exifData.gps.GPSLongitude
    && exifData.gps.GPSLongitudeRef
    && exifData.gps.GPSLatitude
    && exifData.gps.GPSLatitudeRef
  )) return null;

  try {
    const longitude = ConvertDMSToDD(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
    const latitude = ConvertDMSToDD(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
    if (!(longitude && latitude)) return null;
    return { longitude, latitude };
  } catch(err) {
    console.log(path, exifData);
    return null;
  }
}