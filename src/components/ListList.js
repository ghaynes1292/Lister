import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
    const { classes, lists } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {Object.keys(lists).map((list) =>
            <ListItem
              button
              key={list}
              onClick={() => this.handleSelect(list)}
            >
              <ListItemText primary={lists[list].title} />
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
