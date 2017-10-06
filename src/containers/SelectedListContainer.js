import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { updateListTitle, updateListItem, deleteListItem, clearList } from '../actions'
import { getSelectedList, sortedListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state),
    listItems: sortedListItems(state)
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
