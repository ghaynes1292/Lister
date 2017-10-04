import { connect } from 'react-redux'

import SelectedList from '../components/SelectedList'

import { addListItem, updateListTitle, updateListItem } from '../actions'
import { getSelectedList, getSelectedListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  console.log('items', getSelectedListItems(state), state)
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
    addListItem: () => {
      dispatch(addListItem())
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList)

export default VisibleTodoList
