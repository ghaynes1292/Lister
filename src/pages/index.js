/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import NewList from '../components/NewList';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
};

class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       <Grid container spacing={24}>
         <Grid item xs={12}>
           <Typography type="display1" align='center' gutterBottom>
             Lister
           </Typography>
           <NewList />
        </Grid>
       </Grid>
     </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
