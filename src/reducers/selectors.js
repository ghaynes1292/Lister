import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

import { newTheme } from '../reducers'

export const getSelectedList = (state) => state.lists.lists[state.lists.selectedList]
export const getFirstList = (state) => Object.values(state.lists.lists)[0]
export const getSelectedListItems = (state) =>
  filter(state.listItems, (o) => getSelectedList(state).listItems.includes(o.id))

export const getFirstListItems = (state) =>
  filter(state.listItems, (o) => getFirstList(state).listItems.includes(o.id))

export const sortedListItems = (state) => sortBy(getSelectedListItems(state), (o) => o.createdAt)

export const getCurrentUser = (state) => {
  return state.userAuth ? state.users[state.userAuth.uid] : null
}

export const getCurrentUserTheme = (state) => getCurrentUser(state) ? getCurrentUser(state).theme : newTheme()

export const getPublicLists = (state) => filter(state.lists.lists, 'public')
export const getUserLists = (state) => {
  const currentUser = getCurrentUser(state)
  return currentUser ? filter(state.lists.lists, (o) => currentUser.lists.includes(o.id)) : []
}
