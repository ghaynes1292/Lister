import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';

import TitleInput from './TitleInput';
import ListItem from './ListItem';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class SelectedList extends Component {
  render() {
    const { classes, list, listItems, updateListTitle, updateListItem, deleteListItem } = this.props;
    const { title } = list;
    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <Card elevation={4}>
            <CardContent>
            <TitleInput
              title={title}
              updateTitle={(event) => updateListTitle(event.target.value)}
            />
            {listItems.map((item, index) =>
              <ListItem
                key={item.id}
                item={item}
                updateListItem={(newItem) => updateListItem(item.id, newItem)}
                deleteListItem={() => deleteListItem(item.id)}
              />
            )}
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

SelectedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedList);
