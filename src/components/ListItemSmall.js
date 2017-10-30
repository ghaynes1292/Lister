import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DoneIcon from 'material-ui-icons/Done';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ClearIcon from 'material-ui-icons/Clear';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';

const styles = theme => ({
  card: {
    maxWidth: 400,
    transition: 'all .3s linear',
    padding: 5
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  render() {
    const { classes, item, deleteListItem, setWatched, setLiked, setDisliked } = this.props;
    const { attributes } = item;
    let cardBackground;
    if (attributes.completed) {
      switch(attributes.liked) {
        case 0: cardBackground = 'rgba(255, 0, 0, .2)';break;
        case 1: cardBackground = 'rgba(211,211,211, .2)';break;
        case 2: cardBackground = 'rgba(0, 128, 0, .2)';break;
        default: cardBackground = 'rgba(211,211,211, .2)';break;
      }
    } else {
      cardBackground = ''
    }

    return (
      <div style={{ maxWidth: '90%' }}>
        <Card className={classes.card} style={{ backgroundColor: cardBackground }}>
          <Typography className={classes.title} type='body2'>{attributes.Title}</Typography>
          <Grid container spacing={0}>
            <Grid item xs={7}>
              <Typography type='caption' noWrap>{attributes.Actors}</Typography>
              <Typography type='caption'>{attributes.Year}</Typography>
            </Grid>
            <Grid item xs={5}>
              <IconButton aria-label="Dislike" onClick={setDisliked}>
                <ThumbDown color={attributes.liked === 0 ? 'red' : 'grey'}/>
              </IconButton>
              <IconButton aria-label="Like" onClick={setLiked}>
                <ThumbUp color={attributes.liked === 2 ? 'green' : 'grey'}/>
              </IconButton>
              <IconButton aria-label="Add to favorites" onClick={setWatched}>
                <DoneIcon color={attributes.completed ? 'green' : 'grey'} />
              </IconButton>
              <IconButton aria-label="Add to favorites" onClick={deleteListItem}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </div>);
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
