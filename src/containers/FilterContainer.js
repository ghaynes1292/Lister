import { connect } from 'react-redux';

import Filter from '../components/Filter';

import { updateFilter } from '../actions';

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFilter: (filter) => {
      dispatch(updateFilter(filter))
    },
  }
}

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default FilterContainer
