import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
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
  render() {
    const { classes,
      list,
      listItems,
      updateListTitle,
      updateListItem,
      deleteListItem,
      clearList,
      requestStatus,
      requestSuggestions
    } = this.props;
    const { title } = list;
    console.log('requestStatus', requestStatus)
    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <Card elevation={4}>
            <CardContent>
              <Grid container>
                <Grid item xs={11} lg={6} >
                  <TitleInput
                    title={title}
                    updateTitle={(event) => updateListTitle(event.target.value)}
                  />
                </Grid>
                <Grid item xs={1} lg={2} >
                  <Icon onClick={() => clearList()} color="contrast">clear</Icon>
                </Grid>
              </Grid>
              {listItems.length > 0 &&<ListItem
                key={listItems[0].id}
                item={listItems[0]}
                updateListItem={(newItem) => updateListItem(listItems[0].id, newItem)}
                deleteListItem={() => deleteListItem(listItems[0].id)}
                request={requestSuggestions}
                autoComplete
                requestSuggestions={requestSuggestions}
              />}
              {listItems.slice(1).map((item, index) =>
                <ListItem
                  key={item.id}
                  item={item}
                  updateListItem={(newItem) => updateListItem(item.id, newItem)}
                  deleteListItem={() => deleteListItem(item.id)}
                  request={requestSuggestions}
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
