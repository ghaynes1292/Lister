import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    textAlign: 'center'
  },
  paper: {
    padding: 10,
    textAlign: 'center'
  },
});

class BlurredListItem extends Component {
  render() {
    const { classes, title, id, selectList } = this.props;
    return (
      <Grid item xs={6} lg={4}>
        <Grid container justify='center'>
          <Grid item xs={10} lg={8}>
            <Paper elevation={2} className={classes.paper} onClick={() => selectList(id)}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography type='title' className={classes.title}>
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BlurredListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlurredListItem);
