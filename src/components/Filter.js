import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

import {
  WATCHED,
  RELEASE,
  TITLE,
  ADDED
} from '../util/filter'

const styles = theme => ({
});

class Filter extends React.Component {
  handleChange (e) {
    const { updateFilter } = this.props;
    updateFilter(e.target.value)
  }

  render() {
    const { filter } = this.props;

    return <Select
      value={filter.type}
      onChange={(e) => this.handleChange(e)}
      input={<Input id="age-simple" />}
    >
      <MenuItem value={WATCHED}>Watched Date</MenuItem>
      <MenuItem value={RELEASE}>Release Date</MenuItem>
      <MenuItem value={TITLE}>Title</MenuItem>
      <MenuItem value={ADDED}>Date Added</MenuItem>
    </Select>
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);
