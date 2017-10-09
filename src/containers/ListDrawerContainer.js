import { connect } from 'react-redux'

import ListDrawer from '../components/ListDrawer';

import { userLogin, userLogout } from '../actions'

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth,
    user: state.user
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
