import { combineReducers } from 'redux'

import loading from './loading';
import list from './list';
import image from './image';
import form from './form';

export default combineReducers({
  loading, list, image, form
});
