import { connect } from 'react-redux'

import ThemeSelection from '../components/ThemeSelection';

import { updatePrimaryColor, updateSecondaryColor } from '../actions'

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePrimaryColor: (color) => {
      dispatch(updatePrimaryColor(color))
    },
    updateSecondaryColor: (color) => {
      dispatch(updateSecondaryColor(color))
    },
  }
}

const ThemeSelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSelection)

export default ThemeSelectionContainer
