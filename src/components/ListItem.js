import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  root: {
    marginTop: 10,
  },
  addIcon: {
    textAlign: 'right'
  },
  deleteIcon: {
    textAlign: 'initial'
  }
});

class ListItem extends React.Component {
  render() {
    const { classes, item, updateListItem, deleteListItem } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={1} lg={1} >
          <div className={classes.addIcon}>
            <Icon color="contrast">add</Icon>
          </div>
        </Grid>
        <Grid item xs={10} >
          <Input
            placeholder='List Item'
            fullWidth
            value={item.text}
            onChange={(event) => updateListItem(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} lg={1} >
          <div className={classes.deleteIcon} onClick={deleteListItem}>
            <Icon color="contrast">delete</Icon>
          </div>
        </Grid>
      </Grid>

    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItem);
