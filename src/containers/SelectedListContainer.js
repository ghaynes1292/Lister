import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { updateListTitle, updateListItem, deleteListItem, deleteList, lockList, unlockList } from '../actions'
import { getSelectedList, sortedListItems, getCurrentUser } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state),
    listItems: sortedListItems(state),
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateListTitle: (title, id) => {
      dispatch(updateListTitle(title, id))
    },
    updateListItem: (id, text, listId) => {
      dispatch(updateListItem(id, text, listId))
    },
    deleteListItem: (id, listId) => {
      dispatch(deleteListItem(id, listId))
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
