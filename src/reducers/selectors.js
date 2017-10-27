import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import last from 'lodash/last';
import get from 'lodash/get';

import { newTheme } from '../reducers';
import { getSortable } from '../util/filter';

export const getSelectedList = (state) => getCurrentUser(state) ? state.lists[getCurrentUser(state).selectedList] : null
export const getFirstList = (state) => Object.values(state.lists)[0]
export const getSelectedListItems = (state) => getSelectedList(state) && getSelectedList(state).listItems
  ? filter(state.listItems, (o) => getSelectedList(state).listItems.includes(o.id))
  : []

export const getFirstListItems = (state) =>
  filter(state.listItems, (o) => getFirstList(state).listItems.includes(o.id))

export const sortedListItems = (state) =>
  sortBy(getSelectedListItems(state), (o) => getSortable(state.filter.type, get(o, state.filter.type)))

export const getCurrentUser = (state) => state.userAuth ? state.users[state.userAuth.id] : null
export const getCurrentUserTheme = (state) => getCurrentUser(state) && getCurrentUser(state).theme ? getCurrentUser(state).theme : newTheme()

export const getPublicLists = (state) => filter(state.lists, 'public')
export const getUserLists = (state) => {
  const currentUser = getCurrentUser(state)
  return currentUser && currentUser.lists ? filter(state.lists, (o) => currentUser.lists.includes(o.id)) : []
}

export const getLastList = (state) => last(sortBy(state.lists, (o) => o.createdAt))
