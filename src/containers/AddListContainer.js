import { connect } from 'react-redux'

import AddListButton from '../components/AddListButton'

import { addList } from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    addList: () => {
      dispatch(addList())
    },
  }
}

const AddListContainer = connect(
  null,
  mapDispatchToProps
)(AddListButton)

export default AddListContainer
