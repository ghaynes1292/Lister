import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import lists from './list';
import listItems from './listItem';
import request from './request';

export const makeList = (item = null) => ({
  [uuidv4()]: {
    title: '',
    listItems: [Object.keys(item)[0]]
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
  }
};

const rootReducer = combineReducers({
  listItems,
  lists,
  request
})

export default rootReducer
