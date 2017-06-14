import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

import App from './components/app';
import reducers from './reducers';

require('../style/style.scss');

// Init saga middleware
const sagaMiddleware = createSagaMiddleware();
// Apply redux-saga middleware to redux
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
// Run our root saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
