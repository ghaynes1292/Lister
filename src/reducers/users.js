import update from 'immutability-helper';
import indexOf from 'lodash/indexOf'

import { initialState, newUser } from '../reducers'

import {
  CREATE_USER,
  UPDATE_USER
} from '../actions';

function userAuth(state = initialState.users, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        [action.user.uid]: newUser(action.user)
      }
      case UPDATE_USER:
        return {
          ...state,
          [action.user.id]: update(state[action.user.id], {$merge: action.user})
        }
    default:
      return state
  }
}
export default userAuth
