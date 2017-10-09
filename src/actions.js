import uuidv4 from 'uuid/v4';
import moment from 'moment';

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';
export const RECEIVE_PERSISTED_LIST_ITEMS = 'RECEIVE_PERSISTED_LIST_ITEMS';

export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
export const DELETE_LIST = 'DELETE_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const RECEIVE_PERSISTED_LISTS = 'RECEIVE_PERSISTED_LISTS';

export const UPDATE_PRIMARY_COLOR = 'UPDATE_PRIMARY_COLOR';
export const UPDATE_SECONDARY_COLOR = 'UPDATE_SECONDARY_COLOR';
export const RECEIVE_PERSISTED_THEME = 'RECEIVE_PERSISTED_THEME';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

/*
 * action creators
 */
export const receivePersistedLists = lists => ({ type: RECEIVE_PERSISTED_LISTS, lists })

export const receivePersistedListItems = listItems => ({ type: RECEIVE_PERSISTED_LIST_ITEMS, listItems })

export const receivePersistedTheme = theme => ({ type: RECEIVE_PERSISTED_THEME, theme })

export const userLogin = user => ({ type: LOGIN_USER, user })
export const userLogout = () => ({ type: LOGOUT_USER })

export function addListItem() {
  return { type: ADD_LIST_ITEM, id: uuidv4(), createdAt: moment().format() }
}

export function deleteListItem(id) {
  return { type: DELETE_LIST_ITEM, id }
}

export function addList() {
  return { type: ADD_LIST }
}

export function deleteList(id, listItems) {
  return { type: DELETE_LIST, id, listItems }
}

export function clearList() {
  return { type: CLEAR_LIST }
}

export function selectList(id) {
  return { type: SELECT_LIST, id }
}

export function updateListTitle(title) {
  return { type: UPDATE_LIST_TITLE, title }
}

export function updateListItem(id, text) {
  return { type: UPDATE_LIST_ITEM, id, text }
}

export function updatePrimaryColor(color) {
  return { type: UPDATE_PRIMARY_COLOR, color }
}

export function updateSecondaryColor(color) {
  return { type: UPDATE_SECONDARY_COLOR, color }
}
