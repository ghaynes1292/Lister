import { takeEvery, select, put, fork, all } from 'redux-saga/effects';
import find from 'lodash/find';
import omit from 'lodash/omit';

import { saveUser } from '../util/storageUtil';
import { fbPersistLists, fbPersistListItems, fbPersistListItem } from '../util/firebase';
import {
  ADD_LIST,
  ADD_LIST_ITEM,
  UPDATE_LIST_TITLE,
  UPDATE_LIST_ITEM,
  FETCH_COMPLETE_LIST_ITEM,
  DELETE_LIST,
  DELETE_LIST_ITEM,
  LOGIN_USER,
  UNLOCK_LIST,
  LOCK_LIST,
  CREATE_USER,
  UPDATE_USER,
  ADD_LIST_USER,
  updateUser,
  createUser,
  fetchCompleteListItem,
} from '../actions'

import { getCurrentUser, getLastList } from '../reducers/selectors';

function* maintainUser(action) {
  try {
    const users = yield select(state => state.users)
    if (!find(users, ['uid', action.user.uid])) {
      yield put(createUser(action.user))
    }
  } catch(e) {
    yield e
  }
}

function* userSaga() {
  yield [
    takeEvery([LOGIN_USER], maintainUser)
  ]
}

function* maintainUserList(action) {
  try {
    const { user, list } = yield select(state => ({ user: getCurrentUser(state), list: getLastList(state) }))
    const updatedUser = {
      ...user,
      selectedList: list.id,
      lists: [...user.lists, list.id]
    }
    yield put(updateUser(updatedUser))
  } catch(e) {
    yield e
  }
}

function* listUserSaga() {
  yield [
    takeEvery([ADD_LIST], maintainUserList)
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

function* persistListItem(action) {
  try {
    fbPersistListItem(action.item)
  } catch(e) {
    yield e
  }
}

function* persistListItemUpdate(action) {
  try {
    console.log('action here', action)
    fbPersistListItem(omit(action.payload, 'listId'))
  } catch(e) {
    yield e
  }
}

function* firebaseStorageSaga() {
  yield [
    takeEvery([ADD_LIST_ITEM, DELETE_LIST, DELETE_LIST_ITEM], persistListItems),
    takeEvery([UPDATE_LIST_ITEM], persistListItem),
    takeEvery([`${FETCH_COMPLETE_LIST_ITEM}_FULFILLED`], persistListItemUpdate),
    takeEvery([ADD_LIST, UPDATE_LIST_TITLE, UNLOCK_LIST, LOCK_LIST, DELETE_LIST,
      ADD_LIST_ITEM, DELETE_LIST_ITEM], persistLists),
  ]
}

function* localSaveUser() {
  try {
    const user = yield select(state => getCurrentUser(state))
    saveUser(user)
  } catch(e) {
    yield e
  }
}

function* populateListItem(action) {
  try {
    yield put(fetchCompleteListItem(action.id, action.attributes, action.listId, action.createdAt))
  } catch(e) {
    yield e
  }
}

function* listItemSaga() {
  yield [
    takeEvery([ADD_LIST_ITEM], populateListItem),
  ]
}

function* localStorageSaga() {
  yield [
    takeEvery([CREATE_USER, UPDATE_USER, ADD_LIST_USER], localSaveUser),
  ]
}

export default function* rootSaga() {
  yield all([
    fork(localStorageSaga),
    fork(listUserSaga),
    fork(firebaseStorageSaga),
    fork(userSaga),
    fork(listItemSaga)
  ])
}
