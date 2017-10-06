import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

const styles = theme => ({

});

function AddListButton(props) {
  const classes = props.classes;
  return (
    <Button fab color="primary" aria-label="add" onClick={props.addList}>
      <Icon>add</Icon>
    </Button>
  );
}

AddListButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddListButton);
