import { connect } from 'react-redux'

import ListList from '../components/ListList'

import { updateUser } from '../actions'
import { getPublicLists, getUserLists, getCurrentUser } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    publicLists: getPublicLists(state),
    privateLists: getUserLists(state),
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectList: (user, id) => {
      dispatch(updateUser({ ...user, selectedList: id }))
    },
  }
}

const ListListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListList)

export default ListListContainer
