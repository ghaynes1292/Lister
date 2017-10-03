import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  root: {
    marginTop: 10,
  },
  icon: {
    textAlign: 'end'
  }
});

class ListItem extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={2} lg={1} >
          <div className={classes.icon}>
            <Icon color="contrast">add_circle</Icon>
          </div>
        </Grid>
        <Grid item xs={8} >
          <Input placeholder='List Item' fullWidth />
        </Grid>
      </Grid>

    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItem);
