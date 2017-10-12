import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  listTitle: {
    padding: '10px 0px'
  }
});

class ListList extends React.Component {
  handleSelect (id) {
    const { toggleDrawer, selectList, user } = this.props;
    selectList(user, id);
    toggleDrawer();
  }

  render () {
    const { classes, publicLists, privateLists } = this.props;

    return (
      <div className={classes.root}>
        <Typography type='title' align='center' className={classes.listTitle}>
          Public Lists
        </Typography>
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
        <Typography type='title' align='center' className={classes.listTitle}>
          Your Lists
        </Typography>
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
