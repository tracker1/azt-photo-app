import {
  IMAGE_LIST
} from 'client/constants';

export default (state = null, action) => {
  switch (action.type) {
    case IMAGE_LIST:
      return action.payload;
  }
  return state;
};