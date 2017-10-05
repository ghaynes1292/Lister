import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise-middleware';

import Index from './pages/index';
import listStorageSaga from './middleware/sagas'
import registerServiceWorker from './registerServiceWorker';
import { fetchCachedLists, fetchCachedListItems, receiveCachedListItems, receiveCachedLists } from './actions'
import { dbListItemRef, dbListRef } from './util/firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, promiseMiddleware())))

sagaMiddleware.run(listStorageSaga);

dbListItemRef.on('value', function(snapshot) {
  store.dispatch(receiveCachedListItems(snapshot.val()));
});

dbListRef.on('value', function(snapshot) {
  store.dispatch(receiveCachedLists(snapshot.val()));
});

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();
