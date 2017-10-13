import update from 'immutability-helper';
import indexOf from 'lodash/indexOf'
import omit from 'lodash/omit'

import { initialState, makeList } from '../reducers'

import {
  ADD_LIST,
  UPDATE_LIST_TITLE,
  CLEAR_LIST,
  DELETE_LIST,
  RECEIVE_PERSISTED_LISTS,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
  UNLOCK_LIST,
  LOCK_LIST
} from '../actions';

function list(state = initialState.lists, action) {
  console.log('list state', state)
  switch (action.type) {
    case ADD_LIST:
      const newList = makeList(action.userId, action.id);
      console.log('new list', newList, action)
      return {
        ...state,
        ...newList
      }
    case UPDATE_LIST_TITLE:
      return update(state, {
        [action.listId]: { title: {$set: action.title} }
      })
    case UNLOCK_LIST:
      return update(state, {
        [action.listId]: { public: {$set: true} }
      })
    case LOCK_LIST:
      return update(state, {
        [action.listId]: { public: {$set: false} }
      })
    case DELETE_LIST:
      return omit(state, [action.id])
    case RECEIVE_PERSISTED_LISTS:
      return {
        ...initialState.lists,
        ...action.lists
      }
    case ADD_LIST_ITEM:
      return update(state[action.listId].listItems, {$push: [action.id]})
    case DELETE_LIST_ITEM:
      return update(state, {
        [action.listId]: { listItems:
          {$splice: [[indexOf(state[action.listId].listItems, action.id), 1]]} }
      })
    default:
      return state
  }
}
export default list
