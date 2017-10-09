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
import { receivePersistedListItems, receivePersistedLists, receivePersistedTheme, userLogin, userLogout } from './actions'
import { dbListItemRef, dbListRef, dbThemeRef, firebaseAuth } from './util/firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, promiseMiddleware())))

sagaMiddleware.run(listStorageSaga);

firebaseAuth().onAuthStateChanged(user => {
  if (user) {
    console.log("User signed in: ", user);
    store.dispatch(userLogin(user));
  } else {
    console.log('user signed out')
    store.dispatch(userLogout());
  }
});

dbListItemRef.on('value', function(snapshot) {
  store.dispatch(receivePersistedListItems(snapshot.val()));
});

dbListRef.on('value', function(snapshot) {
  store.dispatch(receivePersistedLists(snapshot.val()));
});

dbThemeRef.on('value', function(snapshot) {
  store.dispatch(receivePersistedTheme(snapshot.val()));
});

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();
