import { takeEvery, select, put, fork, all } from 'redux-saga/effects';
import { saveTheme } from '../util/storageUtil';
import { fbPersistLists, fbPersistListItems, fbPersistTheme } from '../util/firebase';
import {
  ADD_LIST,
  ADD_LIST_ITEM,
  UPDATE_LIST_TITLE,
  UPDATE_LIST_ITEM,
  DELETE_LIST,
  DELETE_LIST_ITEM,
  UPDATE_PRIMARY_COLOR,
  RECEIVE_PERSISTED_THEME,
  addListItem,
  deleteListItem,
} from '../actions'

import {  getSelectedListItems } from '../reducers/selectors';

function* maintainList(action) {
  try {
    const listItems = yield select(state => getSelectedListItems(state))
    if (!listItems.some((item) => item.text === '')) {
      yield put(addListItem())
    }
    if (action.text === '') {
      yield put(deleteListItem(action.id))
    }
  } catch(e) {
    yield e
  }
}

function* listElementSaga() {
  yield [
    takeEvery([UPDATE_LIST_ITEM, ADD_LIST], maintainList)
  ]
}

function* persistLists() {
  try {
    const lists = yield select(state => state.lists)
    fbPersistLists(lists)
  } catch(e) {
    yield e
  }
}

function* persistListItems() {
  try {
    const listItems = yield select(state => state.listItems)
    fbPersistListItems(listItems)
  } catch(e) {
    yield e
  }
}

function* persistTheme() {
  try {
    const theme = yield select(state => state.theme)
    fbPersistTheme(theme)
  } catch(e) {
    yield e
  }
}

function* firebaseStorageSaga() {
  yield [
    takeEvery([ADD_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST, DELETE_LIST_ITEM], persistListItems),
    takeEvery([ADD_LIST, UPDATE_LIST_TITLE, DELETE_LIST, ADD_LIST_ITEM, DELETE_LIST_ITEM], persistLists),
    takeEvery([UPDATE_PRIMARY_COLOR], persistTheme),
  ]
}

function* localSaveTheme() {
  try {
    const theme = yield select(state => state.theme)
    saveTheme(theme)
  } catch(e) {
    yield e
  }
}

function* localStorageSaga() {
  yield [
    takeEvery([UPDATE_PRIMARY_COLOR, RECEIVE_PERSISTED_THEME], localSaveTheme),
  ]
}

export default function* rootSaga() {
  yield all([
    fork(localStorageSaga),
    fork(listElementSaga),
    fork(firebaseStorageSaga),
  ])
}
