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
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ClearIcon from 'material-ui-icons/Clear';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import without from 'lodash/without'

const styles = theme => ({
  card: {
    maxWidth: 400,
    transition: 'all .3s linear',
    // }
  },
  media: {
    height: 400
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

  renderSubHeader () {
    const { item: { attributes } } = this.props;

    return <Grid container spacing={0}>
      <Grid item xs={9} >
        <Typography type='caption'>{attributes.Actors}</Typography>
      </Grid>
      <Grid item xs={3} >
        <Typography type='caption'>{attributes.Year}</Typography>
      </Grid>
      <Grid item xs={12} >
        {attributes.watchDate && attributes.completed &&
          <Typography type='caption'>
            Watched {moment.duration(moment().diff(moment(attributes.watchDate))).humanize()} ago
          </Typography>
        }
      </Grid>
    </Grid>;
  }

  renderField (keys, type, decorator = null) {
    const { item } = this.props;
    return item.attributes
      ? <Typography type={type}>
        {decorator
          ? <strong style={{ fontWeight: 500 }}>
            {`${decorator} : `}
          </strong>
          : null
        }
        {without(keys.map((key) => item.attributes[key] ? item.attributes[key] : null), null).join(' | ')}
    </Typography>
    : null
  }

  render() {
    const { classes, item, deleteListItem, setWatched, setLiked, setDisliked } = this.props;
    let cardBackground;
    if (item.attributes.completed) {
      switch(item.attributes.liked) {
        case 0: cardBackground = 'rgba(255, 0, 0, .2)';break;
        case 1: cardBackground = 'rgba(211,211,211, .2)';break;
        case 2: cardBackground = 'rgba(0, 128, 0, .2)';break;
      }
    } else {
      cardBackground = ''
    }

    return (
      <div>
        <Card className={classes.card} style={{ backgroundColor: cardBackground }}>
          <CardHeader
            avatar={
              <Avatar
                src={item.attributes && item.attributes.Poster}
                aria-label="Recipe"
                className={classes.avatar} />
            }
            title={(item.attributes && item.attributes.Title) || item.text}
            subheader={this.renderSubHeader()}
          />
          <CardActions disableActionSpacing>
            <IconButton aria-label="Dislike" onClick={setDisliked}>
              <ThumbDown color={item.attributes.liked === 0 ? 'red' : 'grey'}/>
            </IconButton>
            <IconButton aria-label="Like" onClick={setLiked}>
              <ThumbUp color={item.attributes.liked === 2 ? 'green' : 'grey'}/>
            </IconButton>
            <IconButton aria-label="Add to favorites" onClick={setWatched}>
              <DoneIcon color={item.attributes.completed ? 'green' : 'grey'} />
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
              {this.renderField(['Production', 'Released'], 'body1')}
              {this.renderField(['Director'], 'body1', 'Director')}
              {this.renderField(['Writer'], 'body1', 'Writer')}
              {this.renderField(['Runtime'], 'body1', 'Runtime')}
              {this.renderField(['Awards'], 'body1', 'Awards')}
              {this.renderField(['BoxOffice'], 'body1', 'Box Office')}
              {item.attributes.Ratings.map(({ Source, Value }) =>
              <Typography key={Source}>
                <strong style={{ fontWeight: 500 }}>{Source} : </strong>{Value}
              </Typography>
              )}
            </CardContent>
            <CardContent>
              {this.renderField(['Plot'], 'body1', 'Plot')}
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
