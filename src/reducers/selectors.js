import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
import get from 'lodash/get';

import { newTheme } from '../reducers';
import { getSortable, ADDED } from '../util/filter';

export const getSelectedList = (state) => {
  const user = getCurrentUser(state);
  return user ? state.lists[user.selectedList] : null
}

export const getFirstList = (state) => Object.values(state.lists)[0]
export const getSelectedListItems = (state) => {
  const selectedList = getSelectedList(state)
  return selectedList && selectedList.listItems
    ? filter(state.listItems, (o) => selectedList.listItems.includes(o.id))
    : []
}

export const getFirstListItems = (state) =>
  filter(state.listItems, (o) => getFirstList(state).listItems.includes(o.id))

export const sortedListItems = (state) => sortBy(getSelectedListItems(state), (o) => {
  const user = getCurrentUser(state);
  return user.filter
    ? getSortable(user.filter.type, get(o, getCurrentUser(state).filter.type))
    : getSortable(ADDED, get(o, ADDED))
})

export const getCurrentUser = (state) => state.userAuth ? state.users[state.userAuth.id] : null
export const getCurrentUserTheme = (state) => {
  const user = getCurrentUser(state);
  return user && user.theme ? user.theme : newTheme()
}

export const getPublicLists = (state) => filter(state.lists, 'public')
export const getUserLists = (state) => {
  const currentUser = getCurrentUser(state);
  return currentUser && currentUser.lists ? filter(state.lists, (o) => currentUser.lists.includes(o.id)) : []
}

export const getLastList = (state) => last(sortBy(state.lists, (o) => o.createdAt))
