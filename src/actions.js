import uuidv4 from 'uuid/v4';
import moment from 'moment';

import { apiFetchSuggestions } from './util/api';

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';
export const FETCH_CACHED_LIST_ITEMS = 'FETCH_CACHED_LIST_ITEMS'
export const RECEIVE_CACHED_LIST_ITEMS = 'RECEIVE_CACHED_LIST_ITEMS'

export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
export const DELETE_LIST = 'DELETE_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const FETCH_CACHED_LISTS = 'FETCH_CACHED_LISTS'
export const RECEIVE_CACHED_LISTS = 'RECEIVE_CACHED_LISTS'

export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';

/*
 * action creators
 */
export const fetchCachedLists = () => ({ type: FETCH_CACHED_LISTS })
export const receiveCachedLists = lists => ({ type: RECEIVE_CACHED_LISTS, lists })

export const fetchCachedListItems = () => ({ type: FETCH_CACHED_LIST_ITEMS })
export const receiveCachedListItems = listItems => ({ type: RECEIVE_CACHED_LIST_ITEMS, listItems })

export const fetchSuggestions = (text) => ({
  type: FETCH_SUGGESTIONS,
  payload: apiFetchSuggestions(text)
})

export function addListItem() {
  return { type: ADD_LIST_ITEM, id: uuidv4(), createdAt: moment().format() }
}

export function deleteListItem(id) {
  return { type: DELETE_LIST_ITEM, id }
}

export function addList() {
  return { type: ADD_LIST }
}

export function deleteList(id) {
  return { type: DELETE_LIST, id }
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
