import React, {useState} from 'react'
import {Drawer, List, ListItemText, ListItem, Typography, Divider, Hidden} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    color: '#F3F3EE',
    backgroundColor: '#7b7b79',
    position:'relative',
    height: '100vh',
  },
  drawerContainer: {
    overflow: 'auto',
  }
}))
 
const ArrangementDrawer = ({arrangements, featuredArrangementId, handleArrangementClick}) => {
  const classes = useStyles()
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const arrangementListItems = arrangements.map(arrangement => {
    let focusStyle
    if (arrangement.id == featuredArrangementId) {
      focusStyle = {
        backgroundColor: '#4e4e4c'
      }
    }
    return (
        <ListItem 
          divider
          key={arrangement.id}
          button
          style={focusStyle}
        >
          <ListItemText onClick={handleArrangementClick} className={arrangement.id}>
            <Typography variant='h6'>{arrangement.name}</Typography>
            <Typography variant='body1'>{arrangement.type} </Typography>
            <Typography variant='body2'>{arrangement.createdAt}</Typography>
          </ListItemText>
        </ListItem>
    )
  })

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
    <Hidden smUp implementation="css">
      <Drawer
        variant="temporary"
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            {arrangementListItems}
          </List>
        </div>
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <div className={classes.drawerContainer}>
          <List>
            {arrangementListItems}
          </List>
        </div>
      </Drawer>
    </Hidden>
  </nav>
  )
}

export default ArrangementDrawer