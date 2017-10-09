import update from 'immutability-helper';
import indexOf from 'lodash/indexOf'

import { initialState } from '../reducers'

import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions';

function userAuth(state = initialState.userAuth, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    case LOGOUT_USER:
      return initialState.userAuth
    default:
      return state
  }
}
export default userAuth
