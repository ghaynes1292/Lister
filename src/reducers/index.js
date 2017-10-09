import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { orange, blueGrey } from 'material-ui/colors';

import { getTheme } from '../util/storageUtil';

import lists from './list';
import listItems from './listItem';
import theme from './theme'

export const makeList = (item = null) => ({
  [uuidv4()]: {
    title: 'Title Goes here',
    listItems: item ? [Object.keys(item)[0]] : []
  }
});

export const makeListItem = (id, createdAt) => {
  return { [id]: { id, text: '', createdAt } };
}

const initialListItem = makeListItem(uuidv4(), moment().format());
const initialList = makeList(initialListItem);
export const initialState = {
  lists: {
    lists: { ...initialList },
    selectedList: Object.keys(initialList)[0]
  },
  listItems: {
    ...initialListItem
  },
  theme: {
    palette: {
      primary: orange,
      secondary: blueGrey,
    },
    ...getTheme()
  }
};

const rootReducer = combineReducers({
  listItems,
  lists,
  theme
})

export default rootReducer
