import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'

import Index from './pages/index';
import listStorageSaga from './middleware/sagas'
import registerServiceWorker from './registerServiceWorker';
import { fetchCachedLists, fetchCachedListItems } from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(listStorageSaga);
store.dispatch(fetchCachedListItems())
store.dispatch(fetchCachedLists())

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();
