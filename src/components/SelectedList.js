import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import DeleteSweep from 'material-ui-icons/DeleteSweep';
import LockOutline from 'material-ui-icons/LockOutline';
import LockOpen from 'material-ui-icons/LockOpen';
import ListIcon from 'material-ui-icons/List';
import ViewListIcon from 'material-ui-icons/ViewList';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import moment from 'moment';

import TitleInput from './TitleInput';
import ListItemCard from './ListItemCard';
import ListItemSmall from './ListItemSmall';
import AutoSuggestInput from './AutoSuggestInput';
import FilterContainer from '../containers/FilterContainer';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  gridType: {
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 5,
  },
  filter: {
    textAlign: 'right',
    paddingTop: 5,
    paddingBottom: 5,
  }
});

class SelectedList extends Component {
  state = {
    displayGrid: true
  }

  handleDelete(id) {
    const { deleteListItem, list } = this.props;
    deleteListItem(id, list.id);
  }

  handleWatched(index) {
    const { listItems, list, updateListItem } = this.props;
    const newListItem = {
      ...listItems[index],
      attributes: {
        ...listItems[index].attributes,
        watchDate: moment().format(),
        completed: !listItems[index].attributes.completed,
        liked: 1
      }
    };
    updateListItem(listItems[index].id, newListItem, list.id)
  }

  handleLikeDislike(index, status) {
    const { listItems, list, updateListItem } = this.props;
    const newListItem = {
      ...listItems[index],
      attributes: {
        ...listItems[index].attributes,
        watchDate: !listItems[index].attributes.watchDate ? moment().format() : listItems[index].attributes.watchDate,
        completed: true,
        liked: status === listItems[index].attributes.liked ? 1 : status
      }
    };
    updateListItem(listItems[index].id, newListItem, list.id)
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
      addListItem,
      deleteList,
    } = this.props;
    const { displayGrid } = this.state;
    const { title, id: listId } = list;
    console.log('list items', listItems)
    return <div>
      <Grid container spacing={0}>
        <Grid item xs={8} lg={7} >
          <TitleInput
            title={title}
            updateTitle={(event) => updateListTitle(event.target.value, listId)}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="Delete" disabled={list.owner !== user.id}>
            <DeleteSweep
              onClick={() => deleteList(listId, listItems.map((item) => item.id))} />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          {this.renderLockOrUnlocked()}
        </Grid>
      </Grid>
      <AutoSuggestInput
        addListItem={(attributes) => addListItem(listId, attributes)}
      />
      <Grid container spacing={8}>
        <Grid item xs={7}>
          <IconButton onClick={() => this.setState({ displayGrid: !displayGrid })}>
            {displayGrid ? <ListIcon /> : <ViewListIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <FilterContainer />
        </Grid>
      </Grid>
      {listItems.length > 0
        ? <Grid container spacing={8}>
            {listItems.map((item, index) =>
              <Grid item xs={12} lg={4} key={item.id}>
                {displayGrid
                  ? <ListItemCard
                    item={item}
                    deleteListItem={() => this.handleDelete(item.id)}
                    setWatched={() => this.handleWatched(index)}
                    setLiked={() => this.handleLikeDislike(index, 2)}
                    setDisliked={() => this.handleLikeDislike(index, 0)}
                  />
                  : <ListItemSmall
                    item={item}
                    deleteListItem={() => this.handleDelete(item.id)}
                    setWatched={() => this.handleWatched(index)}
                    setLiked={() => this.handleLikeDislike(index, 2)}
                    setDisliked={() => this.handleLikeDislike(index, 0)}
                  />
                }
              </Grid>
            )}
        </Grid>
        : <Typography type="display3" align='center' gutterBottom>
          No List Items
        </Typography>
      }
    </div>
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
