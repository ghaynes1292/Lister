import { initialState } from '../reducers'

import {
  UPDATE_FILTER
} from '../actions';

function filter(state = initialState.filter, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...action.filter
      }
    default:
      return state
  }
}
export default filter
