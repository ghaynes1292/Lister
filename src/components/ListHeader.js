import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ListIcon from 'material-ui-icons/List';
import ViewListIcon from 'material-ui-icons/ViewList';
import IconButton from 'material-ui/IconButton';

import Filter from './Filter';

const styles = theme => ({
});

class ListHeader extends React.Component {
  handleUpdateUser (change) {
    const { updateUser, user: { id } } = this.props;

    updateUser({
      id,
      ...change
    })
  }

  render() {
    const { user } = this.props;
    const { view, filter } = user;

    return <Grid container spacing={8}>
      <Grid item xs={7}>
        <IconButton onClick={() => this.handleUpdateUser({ view: view === 'GRID' ? 'LIST' : 'GRID' })}>
          {view === 'GRID' ? <ListIcon /> : <ViewListIcon />}
        </IconButton>
      </Grid>
      <Grid item xs={5}>
        <Filter
          filter={filter}
          updateFilter={(value) => this.handleUpdateUser({ filter: { ...filter, type: value } })}
        />
      </Grid>
    </Grid>
  }
}

ListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListHeader);
