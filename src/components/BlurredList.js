import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import TitleInput from './TitleInput';
import ListItem from './ListItem';

const styles = theme => ({
  title: {
    textAlign: 'center'
  },
  paper: {
    padding: 10,
    textAlign: 'center'
  },
});

class BlurredList extends Component {
  render() {
    const { classes, listItems, list } = this.props;
    console.log(listItems)
    return (
      <Grid container justify='center'>
        <Grid item xs={10} lg={8}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography type='title' className={classes.title}>
                  {list.title}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

BlurredList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlurredList);
