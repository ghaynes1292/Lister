import { connect } from 'react-redux'

import ListDrawer from '../components/ListDrawer';

import { userLogin, userLogout } from '../actions'
import { getCurrentUser } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth,
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (user) => {
      dispatch(userLogin(user))
    },
    userLogout: () => {
      dispatch(userLogout())
    },
  }
}

const ListDrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDrawer)

export default ListDrawerContainer
