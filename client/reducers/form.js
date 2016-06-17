import {
  FORM_TAB
} from 'client/constants';

export const defaultState = {
  tab: 'sign'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FORM_TAB:
      return { ...state, tab: action.payload };
  }
  return state;
};
