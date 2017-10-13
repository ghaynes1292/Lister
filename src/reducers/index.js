import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { orange, blueGrey } from 'material-ui/colors';

import { getUser } from '../util/storageUtil';

import lists from './list';
import listItems from './listItem';
import users from './users'
import userAuth from './userAuth'

export const makeList = (userId = null, id = uuidv4()) => ({
  [id]: {
    id: id,
    createdAt: moment().format(),
    owner: userId,
    title: 'Title Goes here',
    public: true,
    listItems: []
  }
});
export const newTheme = () => ({
  palette: {
    primary: orange,
    secondary: blueGrey,
  }
});

export const makeListItem = (id, createdAt, attributes = {}) => {
  return {
    [id]: {
      id,
      createdAt,
      attributes: {
        title: null,
        year: null,
        star: null,
        poster: null,
        watchDate: null,
        completed: false,
        ...attributes
      }
    }
  };
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
