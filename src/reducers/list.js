import update from 'immutability-helper';

import { initialState, makeList } from '../reducers'

import {
  ADD_LIST,
  UPDATE_LIST_TITLE,
  DELETE_LIST,
  RECEIVE_CACHED_LISTS,
  ADD_LIST_ITEM
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
      const returnVal = {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { title: {$set: action.title} }
        })
      }
      console.log(returnVal)
      return returnVal
    case RECEIVE_CACHED_LISTS:
      return {
        ...initialState.lists,
        ...action.lists
      }
    case ADD_LIST_ITEM:
      const returnval = {
        ...state,
        lists: update(state.lists, {
          [state.selectedList]: { listItems: {$set: [
            ...state.lists[state.selectedList].listItems,
            action.id
          ]} }
        })
      }
      console.log(returnval)
      return returnval
    default:
      return state
  }
}
export default list
