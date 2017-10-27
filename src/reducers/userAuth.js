import { initialState } from '../reducers'

import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions';

function userAuth(state = initialState.userAuth, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...action.user,
        id: state.id
      }
    case LOGOUT_USER:
      return initialState.userAuth
    default:
      return state
  }
}
export default userAuth
