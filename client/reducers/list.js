import {
  IMAGE_SELECTED,
  IMAGE_LIST
} from 'client/constants';

export default (state = null, action) => {
  switch (action.type) {
    case IMAGE_LIST:
      return action.payload;
    case IMAGE_SELECTED:
      var p2 = action.payload;
      return state.map(p => {
        if (p.name !== p2.name) return p;
        return Object.assign(p, {
          isSign: p2.isSign,
          isGate: p2.isGate,
          isRoad: p2.isRoad,
        });
      });
  }
  return state;
};