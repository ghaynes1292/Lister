import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';

import lists from './list';
import listItems from './listItem';

export const makeList = (item = null) => ({
  [uuidv4()]: {
    title: '',
    listItems: [Object.keys(item)[0]]
  }
});

export const makeListItem = (id) => {
  return { [id]: { id, text: '' } };
}

const initialListItem = makeListItem(uuidv4());
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
  lists
})

export default rootReducer
