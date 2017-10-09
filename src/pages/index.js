import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SelectedListContainer from '../containers/SelectedListContainer';
import AddListContainer from '../containers/AddListContainer';
import ListDrawerContainer from '../containers/ListDrawerContainer'

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
  },
};

class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ListDrawerContainer >
          <Grid container spacing={24}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography type="display1" align='center' gutterBottom>
                My List
              </Typography>
            </Grid>
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
