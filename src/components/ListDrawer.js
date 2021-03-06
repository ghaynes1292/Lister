import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import ListListContainer from '../containers/ListListContainer';
import ThemeSelectionContainer from '../containers/ThemeSelectionContainer';

import { userSignIn, userSignOut } from '../util/firebase';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    top: '0px',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarFlex: {
    flex: 1,
  },
  navIconHide: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  drawerContainer: {
    height: '100%'
  },
  drawerHeader: theme.mixins.toolbar,
  docked: {
    height: '100%'
  },
  drawerPaper: {
    width: 250,
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class ListDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleLoginClick = () => {
    this.props.userLogin()
  }

  handleLogoutClick = () => {
    this.props.userLogout()
  }

  render() {
    const { classes, children, userAuth } = this.props;

    const drawer = (
      <div className={classes.drawerContainer}>
        <ThemeSelectionContainer />
        <ListListContainer toggleDrawer={this.handleDrawerToggle}/>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <Icon color="contrast">menu</Icon>
              </IconButton>
              <Typography type="title" className={classes.appBarFlex}>
                {userAuth.name}
              </Typography>
              <Typography>
                Version: {process.env.REACT_APP_VERSION}
              </Typography>
              {userAuth.uid
                ? <Button onClick={() => userSignOut()}>Logout</Button>
                : <Button onClick={() => userSignIn()}>Login</Button>}
            </Toolbar>
          </AppBar>
          <Hidden lgUp>
            <Drawer
              type="temporary"
              open={this.state.mobileOpen}
              classes={{
                docked: classes.docked,
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden lgDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
                docked: classes.docked,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </div>
    );
  }
}

ListDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDrawer);
