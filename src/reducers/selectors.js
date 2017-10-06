import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

export const getSelectedList = (state) => state.lists.lists[state.lists.selectedList]
export const getFirstList = (state) => Object.values(state.lists.lists)[0]
export const getSelectedListItems = (state) =>
  filter(state.listItems, (o) => getSelectedList(state).listItems.includes(o.id))

export const getFirstListItems = (state) =>
  filter(state.listItems, (o) => getFirstList(state).listItems.includes(o.id))

export const sortedListItems = (state) => sortBy(getSelectedListItems(state), (o) => o.createdAt)
