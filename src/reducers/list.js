import update from 'immutability-helper';
import indexOf from 'lodash/indexOf'

import { initialState, makeList } from '../reducers'
import { getDeleteindex } from './selectors';

import {
  ADD_LIST,
  UPDATE_LIST_TITLE,
  DELETE_LIST,
  RECEIVE_CACHED_LISTS,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
} from '../actions';

function list(state = initialState.lists, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        lists: {
          ...state.lists,
          ...makeList()
        }
      }
    case UPDATE_LIST_TITLE:
      return {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { title: {$set: action.title} }
        })
      }
    case RECEIVE_CACHED_LISTS:
      return {
        ...initialState.lists,
        ...action.lists
      }
    case ADD_LIST_ITEM:
      return {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { listItems: {$set: [
            ...state.lists[state.selectedList].listItems,
            action.id
          ]} }
        })
      }
    case DELETE_LIST_ITEM:
      return {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { listItems:
            {$splice: [[indexOf(state.lists[state.selectedList].listItems, action.id), 1]]} }
        })
      }
    default:
      return state
  }
}
export default list
