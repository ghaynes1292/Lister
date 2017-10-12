import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { orange, blueGrey } from 'material-ui/colors';

import { getUser } from '../util/storageUtil';

import lists from './list';
import listItems from './listItem';
import users from './users'
import userAuth from './userAuth'

export const makeList = (item = null, id = uuidv4()) => ({
  [id]: {
    id: id,
    title: 'Title Goes here',
    public: false,
    listItems: item ? [Object.keys(item)[0]] : []
  }
});

export const newTheme = () => ({
  palette: {
    primary: orange,
    secondary: blueGrey,
  }
});

export const makeListItem = (id, createdAt) => {
  return { [id]: { id, text: '', createdAt } };
}

export const newUser = (user) => ({
  id: user.uid,
  name: user.displayName,
  lists: [],
  theme: newTheme()
});

const initialListItem = makeListItem(uuidv4(), moment().format());
const initialList = makeList(initialListItem);
const cachedUser = getUser();
export const initialState = {
  lists: {
    lists: { ...initialList },
    selectedList: Object.keys(initialList)[0]
  },
  listItems: {
    ...initialListItem
  },
  users: {
    [cachedUser.id]: cachedUser
  },
  userAuth: null
};

const rootReducer = combineReducers({
  listItems,
  lists,
  userAuth,
  users
})

export default rootReducer
