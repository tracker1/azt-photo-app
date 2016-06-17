import {
  IMAGE_SELECTED,
  IMAGE_DIRECTION
} from 'client/constants';

export default (state = null, action) => {
  switch (action.type) {
    case IMAGE_SELECTED:
      return action.payload;
  }
  return state;
};