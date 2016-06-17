import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

const isDev = process.env.NODE_ENV !== 'production';

const logger = store => next => action => {
  if (!isDev) return next(action);

  console.info('dispatching', action)
  let result = next(action)
  console.info('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error(err)
    //throw err;
  }
}

const sessionSaver = store => next => action => {
  const result = next(action);
  const state = store.getState();
  sessionStorage['__redux_state'] = JSON.stringify(state);
  return result;
}

const nullAction = store => next => action => action ? next(action) : action;

const promisePayload = ({dispatch}) => next => async (action) => {
  if (!(action.payload && typeof action.payload.then === 'function')) return next(action);
  dispatch({ type: 'LOADING_BEGIN' });
  try {
    const result = await action.payload;
    dispatch({ ...action, payload: result });
    dispatch({ type: 'LOADING_END' });
    return result;
  } catch(err) {
    dispatch({ type: 'ERROR', payload: err, action });
    dispatch({ type: 'LOADING_END' });
    throw err;
  }
};

const thunk = (...thunkArgs) => ({dispatch, getState}) => next => action =>
  typeof action === 'function' ?
    action(dispatch, getState, ...thunkArgs) :
    next(action);

// recover saved state from sessionStorage
export function getInitialState() {
  try {
    return JSON.parse(sessionStorage['__redux_state']) || {};
  } catch(err) {
    return {};
  }
}

// create store instance, passed in reducer
export default function createStoreInstance(...thunkArgs) {
  return createStore(reducer, getInitialState(), compose(
    applyMiddleware(
      crashReporter,
      nullAction,
      thunk(...thunkArgs),
      promisePayload,
      logger,
      sessionSaver,
    ),
    process.env.NODE_ENV !== 'production' && window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}