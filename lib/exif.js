import {ExifImage} from 'exif';

export default function(path) {
  return new Promise((resolve, reject) => {
    new ExifImage({image: path}, function(error, exifData){
      if (error) return reject(error);
      return resolve(exifData);
    });
  });
}