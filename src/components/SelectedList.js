import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';

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
  handleDelete(id) {
    const { listItems, deleteListItem } = this.props;

    if (listItems.length > 1) {
      deleteListItem(id);
    }
  }

  render() {
    const { classes,
      list,
      listItems,
      listId,
      updateListTitle,
      updateListItem,
      clearList,
      deleteList,
      lockList,
      unlockList
    } = this.props;
    const { title } = list;
    console.log(list, 'list')
    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <Card elevation={4}>
            <CardContent>
              <Grid container>
                <Grid item xs={10} lg={6} >
                  <TitleInput
                    title={title}
                    updateTitle={(event) => updateListTitle(event.target.value)}
                  />
                </Grid>
                <Grid item xs={1} lg={2} >
                  <Icon
                    onClick={() => deleteList(listId, listItems.map((item) => item.id))}>
                    delete_sweep
                  </Icon>
                </Grid>
                <Grid item xs={1} lg={2} >
                  <Icon
                    onClick={() => list.public ? lockList(listId) : unlockList(listId)}>
                    { list.public ? 'lock_open' : 'lock_outline' }
                  </Icon>
                </Grid>
              </Grid>
              {listItems.map((item, index) =>
                <ListItem
                  key={item.id}
                  item={item}
                  updateListItem={(newItem) => updateListItem(item.id, newItem)}
                  deleteListItem={() => this.handleDelete(item.id)}
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
