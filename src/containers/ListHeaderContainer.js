import { connect } from 'react-redux';

import ListHeader from '../components/ListHeader';

import { getCurrentUser } from '../reducers/selectors';
import { updateUser } from '../actions';

const mapStateToProps = state => {
  return {
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user))
    },
  }
}

const ListHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeader)

export default ListHeaderContainer
