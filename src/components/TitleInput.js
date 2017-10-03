import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';

const styles = theme => ({
});

class TitleInput extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} lg={6} >
          <Input placeholder='Title' fullWidth />
        </Grid>
      </Grid>

    );
  }
}

TitleInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleInput);
