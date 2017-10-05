import { takeLatest, takeEvery, select, put, fork, all } from 'redux-saga/effects';
import { saveLists, getLists, saveListItems, getListItems } from '../util/storageUtil';
import { fbPersistLists, fbPersistListItems } from '../util/firebase';
import {
  ADD_LIST,
  ADD_LIST_ITEM,
  UPDATE_LIST_TITLE,
  UPDATE_LIST_ITEM,
  DELETE_LIST,
  DELETE_LIST_ITEM,
  FETCH_CACHED_LISTS,
  FETCH_CACHED_LIST_ITEMS,
  receiveCachedLists,
  receiveCachedListItems,
  addListItem,
  fetchSuggestions
} from '../actions'

import { getSelectedList, getSelectedListItems } from '../reducers/selectors';

function* cacheLists() {
  try {
    const lists = yield select(state => state.lists)
    saveLists(lists)
  } catch(e) {
    yield e
  }
}

function* cacheListItems() {
  try {
    const listItems = yield select(state => state.listItems)
    saveListItems(listItems)
  } catch(e) {
    yield e
  }
}

function* getCachedLists() {
  try {
    const lists = yield getLists()
    yield put(receiveCachedLists(lists))
  } catch(e) {
    yield e
  }
}

function* getCachedListItems() {
  try {
    const listItems = yield getListItems()
    yield put(receiveCachedListItems(listItems))
  } catch(e) {
    yield e
  }
}

function* listStorageSaga() {
  yield [
    takeEvery(FETCH_CACHED_LISTS, getCachedLists),
    takeEvery([ADD_LIST, UPDATE_LIST_TITLE, DELETE_LIST, ADD_LIST_ITEM, DELETE_LIST_ITEM], cacheLists),
    takeEvery(FETCH_CACHED_LIST_ITEMS, getCachedListItems),
    takeEvery([ADD_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST_ITEM], cacheListItems)
  ]
}

function* maintainList() {
  try {
    const listItems = yield select(state => getSelectedListItems(state))
    if (!listItems.some((item) => item.text === '')) {
      yield put(addListItem())
    }
  } catch(e) {
    yield e
  }
}

function* listElementSaga() {
  yield [
    takeEvery([UPDATE_LIST_ITEM, DELETE_LIST_ITEM], maintainList)
  ]
}

function* persistListItems() {
  try {
    const listItems = yield select(state => state.listItems)
    fbPersistListItems(listItems)
  } catch(e) {
    yield e
  }
}

function* persistLists() {
  try {
    const lists = yield select(state => state.lists)
    fbPersistLists(lists)
  } catch(e) {
    yield e
  }
}

function* firebaseStorageSaga() {
  yield [
    takeEvery([ADD_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST_ITEM], persistListItems),
    takeEvery([ADD_LIST, UPDATE_LIST_TITLE, DELETE_LIST, ADD_LIST_ITEM, DELETE_LIST_ITEM], persistLists),
  ]
}

function* dispatchFetch() {
  try {
    const lists = yield select(state => state.lists)
    fbPersistLists(lists)
  } catch(e) {
    yield e
  }
}

function* makeFetchSuggestionsCall({ text }) {
  yield put(fetchSuggestions(text))
}

function* fetchSuggestionsSaga() {
  yield takeLatest(UPDATE_LIST_ITEM, makeFetchSuggestionsCall)
}

export default function* rootSaga() {
  yield all([
    fork(listStorageSaga),
    fork(listElementSaga),
    fork(firebaseStorageSaga),
    fork(fetchSuggestionsSaga),
  ])
}
