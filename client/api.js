import axios from 'axios';
import throttle from 'lodash/throttle';

export const client = axios.create({
  baseURL: '/api/v1/',
  timeout: 5000
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function parseResponse(response, prop = null, defaultValue = null) {
  if (!response.data) throw Object.assign(new Error('Invalid Response'), {response});
  if (response.data && response.data.error) throw response.data.error;
  if (prop === null) return response.data;
  return response.data[prop] || defaultValue;
}

export async function fetchImageList() {
  return parseResponse(await client.get('/image'), 'list', null);
}

export async function fetchImage(id) {
  return parseResponse(await client.get(`/image/${encodeURIComponent(id)}`), 'image', null);
}


const saveImageInner = async (image) => {
  try {
    parseResponse(await client.post(`/image/${encodeURIComponent(image.name)}`, image));
  } catch(err) {
    console.error(err)
    alert('Error while saving.');
  }
};

var __saving = null;
export const saveImage = (async (image) => {
  if (__saving != null) return __saving = image;
  __saving = image;
  while (__saving) {
    let img = __saving;
    await saveImageInner(img);
    if (img === __saving) {
      __saving = null;
      return;
    }
    sleep(100);
  }
});
