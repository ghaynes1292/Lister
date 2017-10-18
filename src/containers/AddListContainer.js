import { connect } from 'react-redux';

import AddListButton from '../components/AddListButton';

import { addList } from '../actions';
import { getCurrentUser } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addList: (userId) => {
      dispatch(addList(userId))
    },
  }
}

const AddListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListButton)

export default AddListContainer
