import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import DoneIcon from 'material-ui-icons/Done';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ClearIcon from 'material-ui-icons/Clear';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    borderRadius: '0'
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, item, deleteListItem } = this.props;
    const subHeaderText = item.attributes && `${item.attributes.star || ''} ${item.attributes.year
      ? `${item.attributes.year}`
      : ''}`
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                src={item.attributes && item.attributes.poster}
                aria-label="Recipe"
                className={classes.avatar} />
            }
            title={(item.attributes && item.attributes.title) || item.text}
            subheader={subHeaderText}
          />
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Add to favorites">
              <DoneIcon />
            </IconButton>
            <IconButton aria-label="Add to favorites" onClick={deleteListItem}>
              <ClearIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
