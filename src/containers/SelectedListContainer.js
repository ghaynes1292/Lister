import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { updateListTitle, updateListItem, deleteListItem, deleteList, lockList, unlockList } from '../actions'
import { getSelectedList, sortedListItems, getFirstList, getFirstListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state) || getFirstList(state),
    listItems: sortedListItems(state) || getFirstListItems(state),
    listId: state.lists.selectedList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateListTitle: (title) => {
      dispatch(updateListTitle(title))
    },
    updateListItem: (id, text) => {
      dispatch(updateListItem(id, text))
    },
    deleteListItem: (id) => {
      dispatch(deleteListItem(id))
    },
    deleteList: (id, listItems) => {
      dispatch(deleteList(id, listItems))
    },
    lockList: (id) => {
      dispatch(lockList(id))
    },
    unlockList: (id) => {
      dispatch(unlockList(id))
    }
  }
}

const SelectedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList)

export default SelectedListContainer
