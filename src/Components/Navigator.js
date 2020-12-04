import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#ffffff',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navLink: {
    textDecoration: "none"
  }
});

function Navigator(props) {
  const { classes, links, location, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Azure OnDemand
        </ListItem>
        <Link
          className={classes.navLink}
          to="/dashboard"
        >
          <ListItem 
            className={classNames(
              classes.item, 
              classes.itemCategory,
              location.pathname === '/dashboard' && classes.itemActiveItem
          )}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Overview
            </ListItemText>
          </ListItem>
        </Link>
        {links.map(({label, children}) => (
          <React.Fragment key={label}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {label}
              </ListItemText>
            </ListItem>
            {children.map(({label: childLabel, path, icon}) => (
              <Link
                className={classes.navLink}
                key={childLabel}
                to={path}
              >
                <ListItem
                  button
                  dense
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    location.pathname.startsWith(path) && classes.itemActiveItem,
                  )}
                >
                  <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childLabel}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
