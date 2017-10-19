import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

import Grid from 'material-ui/Grid';

import SelectedListContainer from '../containers/SelectedListContainer';
import AddListContainer from '../containers/AddListContainer';
import ListDrawerContainer from '../containers/ListDrawerContainer'

const styles = {
  root: {
    flexGrow: 1,
    height: `${window.innerHeight}px`
  },
};

class Index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ListDrawerContainer >
          <Grid container spacing={0}>
            <Grid item xs={9} />
            <Grid item xs={3}>
              <div align='center'>
                <AddListContainer />
              </div>
            </Grid>
            <Grid item xs={12}>
              <SelectedListContainer />
            </Grid>
          </Grid>
        </ListDrawerContainer>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
