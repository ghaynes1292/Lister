import filter from 'lodash/filter'

export const getSelectedList = (state) => state.lists.lists[state.lists.selectedList]
export const getSelectedListItems = (state) =>
  filter(state.listItems, (o) => getSelectedList(state).listItems.includes(o.id))
