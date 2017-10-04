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

class BlurredList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listTitle: '',
      listItems: ['']
    }
  }

  updateListItem (item, index) {
    const newList = this.state.listItems.slice();
    newList.splice(index, 1, item);

    if (newList.slice(-1)[0] !== '') {
      newList.push('')
    }
    this.setState({ listItems: newList });
  }

  deleteListItem(index) {
    const newList = this.state.listItems.slice();
    newList.splice(index, 1);
    this.setState({ listItems: newList });
  }

  updateTitle (title) {
    this.setState({ listTitle: title })
  }

  render() {
    const { classes } = this.props;
    const { listItems, listTitle } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <Card elevation={4}>
            <CardContent>
            <TitleInput
              title={listTitle}
              updateTitle={(event) => this.updateTitle(event.target.value)}
            />
            {listItems.map((item, index) =>
              <ListItem
                key={index}
                item={item}
                updateListItem={(newItem) => this.updateListItem(newItem, index)}
                deleteListItem={() => this.deleteListItem(index)}
              />
            )}
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

BlurredList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlurredList);
