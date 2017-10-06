import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';

const styles = theme => ({
});

class TitleInput extends React.Component {
  render() {
    const { title, updateTitle } = this.props;

    return <Input
      multiline
      placeholder='Title'
      fullWidth
      value={title}
      onChange={updateTitle}
    />
  }
}

TitleInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleInput);
