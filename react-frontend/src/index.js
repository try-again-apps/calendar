import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';
import 'react-table/react-table.css';

import './index.css';
import App from './components/App';
import Calendar from './components/Calendar';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

const store = configureStore(Immutable.Map(), browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Calendar} />
        <Route path="/:year" component={Calendar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
