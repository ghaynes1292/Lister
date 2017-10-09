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
import { receiveCachedListItems, receiveCachedLists, receiveCachedTheme } from './actions'
import { dbListItemRef, dbListRef, dbThemeRef } from './util/firebase';

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

dbThemeRef.on('value', function(snapshot) {
  store.dispatch(receiveCachedTheme(snapshot.val()));
});

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();
