import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { orange, blueGrey } from 'material-ui/colors';

import { getUser } from '../util/storageUtil';

import lists from './list';
import listItems from './listItem';
import users from './users'
import userAuth from './userAuth'

export const makeList = (userId = null, item = null, id = uuidv4()) => ({
  [id]: {
    id: id,
    createdAt: moment().format(),
    owner: userId,
    title: 'Title Goes here',
    public: true,
    listItems: item ? [Object.keys(item)[0]] : []
  }
});
export const newTheme = () => ({
  palette: {
    primary: orange,
    secondary: blueGrey,
  }
});

export const makeListItem = (id, createdAt, text = '') => {
  return { [id]: { id, text: '', createdAt } };
}

export const newUser = (user, id = uuidv4()) => ({
  id: id,
  uid: user ? user.uid : null,
  name: user ? user.displayName : 'Anonymous',
  lists: [],
  theme: newTheme(),
  selectedList: null
});

const cachedUser = getUser();
const currentUser = cachedUser ? cachedUser : newUser(null)

export const initialState = {
  lists: {},
  listItems: {},
  users: {
    [currentUser.id]: currentUser
  },
  userAuth: currentUser
};

const rootReducer = combineReducers({
  listItems,
  lists,
  userAuth,
  users
})

export default rootReducer
