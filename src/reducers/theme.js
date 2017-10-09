import update from 'immutability-helper';

import { initialState } from '../reducers';
import { convertColorToPalette } from '../util/colors';

import {
  UPDATE_PRIMARY_COLOR,
  UPDATE_SECONDARY_COLOR,
  RECEIVE_PERSISTED_THEME
} from '../actions';

function theme(state = initialState.theme, action) {
  switch (action.type) {
    case UPDATE_PRIMARY_COLOR:
      return update(state, {
        palette: { primary: {$set: convertColorToPalette(action.color).palette} }
      })
    case UPDATE_SECONDARY_COLOR:
      return update(state, {
        palette: { secondary: {$set: convertColorToPalette(action.color).palette} }
      })
    case RECEIVE_PERSISTED_THEME:
      return action.theme || initialState.theme
    default:
      return state
  }
}
export default theme
