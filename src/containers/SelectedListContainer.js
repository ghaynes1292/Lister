import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { updateListTitle, updateListItem, deleteListItem, clearList } from '../actions'
import { getSelectedList, sortedListItems, getFirstList, getFirstListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state) || getFirstList(state),
    listItems: sortedListItems(state) || getFirstListItems(state)
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
    clearList: () => {
      dispatch(clearList())
    }
  }
}

const SelectedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList)

export default SelectedListContainer
