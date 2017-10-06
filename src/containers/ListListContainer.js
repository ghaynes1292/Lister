import { connect } from 'react-redux'

import ListList from '../components/ListList'

import { selectList } from '../actions'

const mapStateToProps = state => {
  return {
    lists: state.lists.lists,
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
