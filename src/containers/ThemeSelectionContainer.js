import { connect } from 'react-redux'

import ThemeSelection from '../components/ThemeSelection';

import { updateUser } from '../actions'
import { getCurrentUser, getCurrentUserTheme } from '../reducers/selectors';

const mapStateToProps = state => {
  return {
    theme: getCurrentUserTheme(state),
    user: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePrimaryColor: (user) => {
      dispatch(updateUser(user))
    }
  }
}

const ThemeSelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSelection)

export default ThemeSelectionContainer
