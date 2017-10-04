import update from 'immutability-helper';

import { initialState, makeListItem } from '../reducers'

import {
  ADD_LIST_ITEM,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  RECEIVE_CACHED_LIST_ITEMS,
} from '../actions';

function listItem(state = initialState.listItems, action) {
  switch (action.type) {
    case ADD_LIST_ITEM:
      return {
        ...state,
        listItems: {
          ...state.listItems,
          ...makeListItem(action.id)
        }
      }
    case UPDATE_LIST_ITEM:
      return {
        ...state,
        listItems: update(state.listItems, {
          [action.id]: { text: {$set: action.text} }
        })
      }
    // case DELETE_LIST_ITEM:
    //   return {
    //     ...state,
    //     listItems: update(state.listItems, {
    //       [action.id]: { text: {$set: action.text} }
    //     })
    //   }
    case RECEIVE_CACHED_LIST_ITEMS:
      return {
        ...initialState.listItems,
        ...action.listItems
      }
    default:
      return state
  }
}
export default listItem
