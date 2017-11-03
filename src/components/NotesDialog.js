import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Grid from 'material-ui/Grid';

const styles = {
  notesText: {
    wordWrap: 'break-word',
    maxWidth: 285
  }
};

class SimpleDialog extends React.Component {
  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const { classes, onRequestClose, updateNote, notes, ...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Notes</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={1}
            rowsMax={8}
            value={notes}
            onChange={updateNote}
            label='Notes'
            placeholder='Add some notes'
          />
        </DialogContent>
      </Dialog>

    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class NotesDialog extends React.Component {
  state = {
    open: false,
    notes: this.props.notes,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = value => {
    const { saveNotes } = this.props;
    this.setState({ open: false });
    saveNotes(this.state.notes);
  };

  render() {
    const { classes } = this.props;
    const { open, notes } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item xs={11}>
          <Typography type='body1' className={classes.notesText}>
              <strong style={{ fontWeight: 500 }}>Notes: </strong>{notes}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={this.handleClickOpen}>
            <ModeEdit />
          </IconButton>
        </Grid>
        <SimpleDialogWrapped
          updateNote={(e) => this.setState({ notes: e.target.value })}
          notes={notes}
          open={open}
          onRequestClose={this.handleRequestClose}
          maxWidth='md'
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(NotesDialog);
