import { connect } from 'react-redux'

import ListList from '../components/ListList'

import { selectList } from '../actions'
import { getPublicLists, getUserLists } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    publicLists: getPublicLists(state),
    privateLists: getUserLists(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectList: (id) => {
      dispatch(selectList(id))
    },
  }
}

const ListListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListList)

export default ListListContainer
