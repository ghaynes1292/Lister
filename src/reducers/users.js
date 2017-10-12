import update from 'immutability-helper';
import forEach from 'lodash/forEach'
import reject from 'lodash/reject'

import { initialState, newUser } from '../reducers'

import {
  CREATE_USER,
  UPDATE_USER,
  ADD_LIST_USER,
  DELETE_LIST
} from '../actions';

function users(state = initialState.users, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        [action.user.id]: newUser(action.user)
      }
      case UPDATE_USER:
        return {
          ...state,
          [action.user.id]: update(state[action.user.id], {$merge: action.user})
        }
      case DELETE_LIST:
        const newUsers = {}
        forEach(state, (value, key) => {
          newUsers[key] = { ...value, lists: reject(value.lists, (o) => o === action.id) }
        })
        return newUsers
      case ADD_LIST_USER:
        return {
          ...state,
          [action.user.id]: {
            ...action.user,
            lists: [...action.user.lists, action.listId]
          }
        }
    default:
      return state
  }
}
export default users
