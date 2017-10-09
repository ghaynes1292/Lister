import update from 'immutability-helper';
import indexOf from 'lodash/indexOf'

import { initialState, makeList } from '../reducers'

import {
  ADD_LIST,
  UPDATE_LIST_TITLE,
  CLEAR_LIST,
  SELECT_LIST,
  RECEIVE_PERSISTED_LISTS,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
} from '../actions';

function list(state = initialState.lists, action) {
  switch (action.type) {
    case ADD_LIST:
      const newList = makeList();
      return {
        selectedList: Object.keys(newList)[0],
        lists: {
          ...state.lists,
          ...newList
        }
      }
    case UPDATE_LIST_TITLE:
      return {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { title: {$set: action.title} }
        })
      }
    case CLEAR_LIST:
      return state;
    case SELECT_LIST:
      return {
        ...state,
        selectedList: action.id
      }
    case RECEIVE_PERSISTED_LISTS:
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
