import update from 'immutability-helper';
import omit from 'lodash/omit'

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
        ...makeListItem(action.id, action.createdAt)
      }
    case UPDATE_LIST_ITEM:
      return update(state, {
        [action.id]: { text: {$set: action.text} }
      })
    case DELETE_LIST_ITEM:
      return omit(state, [action.id])
    case RECEIVE_CACHED_LIST_ITEMS:
      return action.listItems || initialState.listItems
    default:
      return state
  }
}
export default listItem
