import { createAction } from 'redux-actions';
import * as api from './api';
import throttle from 'lodash/throttle';

import {
  FORM_TAB,
  IMAGE_LIST,
  IMAGE_SELECTED,
} from './constants';

export const formTab = createAction(FORM_TAB);
export const imageList = createAction(IMAGE_LIST);
export const imageSelected = createAction(IMAGE_SELECTED);

export const loadImageList = () => (dispatch, getState, { api }) => dispatch(imageList(api.fetchImageList()));
export const editImage = (id) => (dispatch, getState, { api }) => dispatch(imageSelected(api.fetchImage(id)));

export const imageDirection = (direction) => (dispatch, getState, { api }) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return;
  image.direction = direction;
  api.saveImage(image)
  dispatch(imageSelected(image));
};

export const setLat = throttle((lat) => (dispatch, getState, { api }) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return; //nothing to do
  image.location = image.location || {};
  image.location.latitude = lat;
  api.saveImage(image)
  dispatch(imageSelected(image));
}, 1000);

export const setLon = (lon) => (dispatch, getState, { api }) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return; //nothing to do
  image.location = image.location || {};
  image.location.longitude = lon;
  api.saveImage(image)
  dispatch(imageSelected(image));
};

export const toggleIsSign = () => (dispatch, getState) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return;
  image.isSign = !image.isSign;
  api.saveImage(image)
  dispatch(imageSelected(image));
}

export const toggleIsGate = () => (dispatch, getState) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return;
  image.isGate = !image.isGate;
  api.saveImage(image)
  dispatch(imageSelected(image));
}

export const toggleIsRoad = () => (dispatch, getState) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return;
  image.isRoad = !image.isRoad;
  api.saveImage(image)
  dispatch(imageSelected(image));
}

export const setValue = (name, value) => (dispatch, getState) => {
  var image = { ...(getState().image || {}) };
  if (!image.name) return;
  image[name] = value;
  api.saveImage(image)
  dispatch(imageSelected(image));
};

export const radioOption = setValue;
