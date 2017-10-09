import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';

import { allColors, convertColorToPalette } from '../util/colors';

const ITEM_HEIGHT = 55;

class ColorPicker extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSelect (color) {
    this.props.updatePrimaryColor(color)
    this.handleRequestClose()
  }

  render() {
    return (
      <div>
        <Button
          aria-owns={this.state.open ? 'primary-color-picker' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Grid container>
            <Grid item xs={11}>
              Select Primary Color
            </Grid>
            <Grid item xs={1} style={{ background: this.props.theme.palette.primary[500] }} />
          </Grid>
        </Button>
        <Menu
          id="primary-color-picker"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 8.5,
              width: ITEM_HEIGHT,
            },
          }}
        >
          {allColors.map((color) => {
            return <MenuItem
              key={color}
              style={{ backgroundColor: convertColorToPalette(color).hex }}
              onClick={() => this.handleSelect(color)}>
            </MenuItem>
          })}
        </Menu>
      </div>
    );
  }
}

export default ColorPicker;
