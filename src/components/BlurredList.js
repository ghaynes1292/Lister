import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import BlurredListItem from './BlurredListItem';

const styles = theme => ({
  title: {
    textAlign: 'center'
  },
  paper: {
    padding: 10,
    textAlign: 'center'
  },
});

class BlurredList extends Component {
  render() {
    const { classes, lists, selectList } = this.props;
    return Object.keys(lists).map((list) =>
      <BlurredListItem
        key={list}
        id={list}
        title={lists[list].title}
        selectList={selectList}
      />)
  }
}

BlurredList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlurredList);
