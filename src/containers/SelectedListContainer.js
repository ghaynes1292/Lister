import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { updateListTitle, updateListItem, deleteListItem } from '../actions'
import { getSelectedList, getSelectedListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state),
    listItems: getSelectedListItems(state)
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
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList)

export default VisibleTodoList
