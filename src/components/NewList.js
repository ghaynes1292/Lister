import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import TitleInput from './TitleInput';
import ListItem from './ListItem';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

function NewList(props) {
  const classes = props.classes;
  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Card elevation={4}>
          <CardContent>
          <TitleInput />
          <ListItem />
        </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

NewList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewList);
