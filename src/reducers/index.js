import { combineReducers } from 'redux'
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { orange, blueGrey } from 'material-ui/colors';

import { getUser } from '../util/storageUtil';
import {
  ASCENDING,
  ADDED
} from '../util/filter'

import lists from './list';
import listItems from './listItem';
import users from './users'
import userAuth from './userAuth'
import filter from './filter';

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
        Title: null,
        Year: null,
        Actors: null,
        Poster: null,
        watchDate: null,
        completed: false,
        id: null,
        liked: 1,
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
  userAuth: currentUser,
  filter: {
    direction: ASCENDING,
    type: ADDED
  }
};

const rootReducer = combineReducers({
  listItems,
  lists,
  userAuth,
  users,
  filter
})

export default rootReducer
