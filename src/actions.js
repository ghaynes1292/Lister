import uuidv4 from 'uuid/v4';
import moment from 'moment';

import { fetchCompleteListItemApi } from './util/api';

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';
export const RECEIVE_PERSISTED_LIST_ITEMS = 'RECEIVE_PERSISTED_LIST_ITEMS';
export const FETCH_COMPLETE_LIST_ITEM = 'FETCH_COMPLETE_LIST_ITEM';

export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST_TITLE = 'UPDATE_LIST_TITLE';
export const DELETE_LIST = 'DELETE_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const LOCK_LIST = 'LOCK_LIST';
export const UNLOCK_LIST = 'UNLOCK_LIST';
export const RECEIVE_PERSISTED_LISTS = 'RECEIVE_PERSISTED_LISTS';

export const UPDATE_PRIMARY_COLOR = 'UPDATE_PRIMARY_COLOR';
export const UPDATE_SECONDARY_COLOR = 'UPDATE_SECONDARY_COLOR';
export const RECEIVE_PERSISTED_THEME = 'RECEIVE_PERSISTED_THEME';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_LIST_USER = 'ADD_LIST_USER';
export const SELECT_LIST = 'SELECT_LIST';

export const UPDATE_FILTER = 'UPDATE_FILTER';

/*
 * action creators
 */
export const receivePersistedLists = lists => ({ type: RECEIVE_PERSISTED_LISTS, lists })
export const receivePersistedListItems = listItems => ({ type: RECEIVE_PERSISTED_LIST_ITEMS, listItems })
export const receivePersistedTheme = theme => ({ type: RECEIVE_PERSISTED_THEME, theme })

export const userLogin = user => ({ type: LOGIN_USER, user })
export const userLogout = () => ({ type: LOGOUT_USER })

export const createUser = (user) => ({ type: CREATE_USER, user })
export const updateUser = (user) => ({ type: UPDATE_USER, user })
export const addListUser = (user, listId) => ({ type: ADD_LIST_USER, user, listId })

export const addList = (userId) => ({ type: ADD_LIST, userId, id: uuidv4() })
export const deleteList = (id, listItems) => ({ type: DELETE_LIST, id, listItems })
export const clearList = () => ({ type: CLEAR_LIST })
export const lockList = (listId) => ({ type: LOCK_LIST, listId })
export const unlockList = (listId) => ({ type: UNLOCK_LIST, listId })
export const updateListTitle = (title, listId) => ({ type: UPDATE_LIST_TITLE, title, listId })

export const addListItem = (listId, attributes) => ({ type: ADD_LIST_ITEM, id: uuidv4(), createdAt: moment().format(), listId, attributes })
export const deleteListItem = (id, listId) => ({ type: DELETE_LIST_ITEM, id, listId })
export const updateListItem = (id, item, listId) => ({ type: UPDATE_LIST_ITEM, id, item, listId })
export const fetchCompleteListItem = (id, attributes, listId, createdAt) => ({
  type: FETCH_COMPLETE_LIST_ITEM,
  payload: fetchCompleteListItemApi(id, attributes, listId, createdAt)
})


export const updatePrimaryColor = (color) => ({ type: UPDATE_PRIMARY_COLOR, color })

export const updateFilter = (filter) => ({ type: UPDATE_FILTER, filter })
