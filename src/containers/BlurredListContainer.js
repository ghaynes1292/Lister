import { connect } from 'react-redux'

import BlurredList from '../components/BlurredList'

import { updateListTitle, updateListItem, deleteListItem, clearList } from '../actions'
import { getSelectedList, sortedListItems } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: getSelectedList(state),
    listItems: sortedListItems(state),
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     updateListTitle: (title) => {
//       dispatch(updateListTitle(title))
//     },
//   }
// }

const BlurredListContainer = connect(
  mapStateToProps,
  null
)(BlurredList)

export default BlurredListContainer
