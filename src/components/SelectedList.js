import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import DeleteSweep from 'material-ui-icons/DeleteSweep';
import LockOutline from 'material-ui-icons/LockOutline';
import LockOpen from 'material-ui-icons/LockOpen';
import IconButton from 'material-ui/IconButton';
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

class SelectedList extends Component {
  handleDelete(id) {
    const { listItems, deleteListItem, listId } = this.props;

    if (listItems.length > 1) {
      deleteListItem(id, listId);
    }
  }

  renderNoneSelected () {
    return <Grid container justify="center">
      <Grid item xs={11} lg={8}>
        <Typography type="display1" align='center' gutterBottom>
          No List Selected
        </Typography>
      </Grid>
    </Grid>;
  }

  renderLockOrUnlocked () {
    const { list, user, lockList, unlockList } = this.props;
    return <IconButton disabled={list.owner !== user.id}>
      {list.public
        ? <LockOpen onClick={() => lockList(list.id)} />
        : <LockOutline onClick={() => unlockList(list.id)} />
      }
      </IconButton>
  }

  renderSelectedList () {
    const { classes,
      list,
      listItems,
      user,
      updateListTitle,
      updateListItem,
      clearList,
      deleteList,
      lockList,
      unlockList
    } = this.props;
    const { title, id: listId } = list;

    return <Grid container justify="center">
      <Grid item xs={11} lg={8}>
        <Card elevation={4}>
          <CardContent>
            <Grid container>
              <Grid item xs={9} lg={7} >
                <TitleInput
                  title={title}
                  updateTitle={(event) => updateListTitle(event.target.value, listId)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="Delete" disabled={list.owner !== user.id}>
                  <DeleteSweep
                    onClick={() => deleteList(listId, listItems.map((item) => item.id))} />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                {this.renderLockOrUnlocked()}
              </Grid>
            </Grid>
            {listItems.map((item, index) =>
              <ListItem
                key={item.id}
                item={item}
                updateListItem={(newItem) => updateListItem(item.id, newItem, listId)}
                deleteListItem={() => this.handleDelete(item.id)}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>;
  }

  render() {
    const { list } = this.props;
    return list ? this.renderSelectedList() : this.renderNoneSelected()
  }
}

SelectedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedList);
