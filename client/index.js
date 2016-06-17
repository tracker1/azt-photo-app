import 'feature/style';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import createStore from './store';
import * as api from './api';
import Main from 'feature/main';

const store = createStore({ api });

ReactDOM.render(
  <Main store={store} />,
  document.getElementById('app-container')
);
