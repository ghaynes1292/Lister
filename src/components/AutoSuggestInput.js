import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

import { apiFetchSuggestions } from '../util/api';

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps;
  return (
    <div>
      <TextField
        autoFocus={autoFocus}
        className={classes.textField}
        placeholder='New Item'
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
      {other.disableUnderline && <LinearProgress className={classes.progressBar} />}
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.Title, query);
  const parts = parse(suggestion.Title, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      {suggestion.Poster &&
        <img
          src={suggestion.Poster}
          alt=''
          style={{ minWidth: '45px', minHeight: '45px', maxWidth: '45px', maxHeight: '45px', paddingRight: '10px' }}
        />}
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
        <br />
        <span style={{ fontWeight: 300 }}>
          {suggestion.Actors}&nbsp;({suggestion.Year})
        </span>
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    minWidth: '300px',
    maxHeight: '400px',
    zIndex: 2
  },
  suggestion: {
    display: 'block',

  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
  progressBar: {
    height: '2px'
  }
});

class AutoSuggestInput extends React.Component {
  state = {
    suggestions: [],
    value: '',
    loading: false
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      loading: true
    })
    apiFetchSuggestions(value)
    .then((response) => {
      this.setState({
        suggestions: response.d.map((suggestion) => ({
          Title: suggestion.l,
          Year: suggestion.y,
          Actors: suggestion.s,
          id: suggestion.id,
          Poster: suggestion.i && suggestion.i[0]
        })),
        loading: false
      })
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      value: ''
    });
  };

  handleChange = (event, value) => {
    if (value.method === 'type') {
      this.setState({ value: value.newValue })
    } else {
      this.props.addListItem(value.newValue)
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          value: value,
          onChange: this.handleChange,
          disableUnderline: this.state.loading
        }}
      />
    );
  }
}

AutoSuggestInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoSuggestInput);
