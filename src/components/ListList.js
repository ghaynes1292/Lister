import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

class ListList extends React.Component {
  handleSelect (id) {
    const { toggleDrawer, selectList } = this.props;
    selectList(id);
    toggleDrawer()
  }

  render () {
    const { classes, publicLists, privateLists } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {publicLists.map((list) =>
            <ListItem
              button
              key={list.id}
              onClick={() => this.handleSelect(list.id)}
            >
              <ListItemText primary={list.title} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          {privateLists.map((list) =>
            <ListItem
              button
              key={list.id}
              onClick={() => this.handleSelect(list.id)}
            >
              <ListItemText primary={list.title} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }

}

ListList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListList);
