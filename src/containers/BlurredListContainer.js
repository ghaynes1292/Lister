import { connect } from 'react-redux'

import BlurredList from '../components/BlurredList'

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

const BlurredListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlurredList)

export default BlurredListContainer
