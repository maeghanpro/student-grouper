import React, {useState} from 'react'
import {Drawer, List, ListItemText, ListItem, IconButton, Toolbar, Typography, Divider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    color: '#F3F3EE',
    backgroundColor: '#7b7b79',
    position:'relative',
    height: '100%',
  },
  drawerContainer: {
    overflow: 'auto',
  }
}))
 
const ArrangementDrawer = ({arrangements, handleArrangementClick}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const arrangementListItems = arrangements.map(arrangement => {
    return (
      <div key={arrangement.id}>
        <Divider/>
        <ListItem 
          button 

          button
        >
          <ListItemText onClick={handleArrangementClick} className={arrangement.id}>
            <Typography variant='h6'>{arrangement.name}</Typography>
            <Typography variant='body1'>{arrangement.type} </Typography>
            <Typography variant='body2'>{arrangement.createdAt}</Typography>
          </ListItemText>
        </ListItem>
      </div>
    )
  })

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
          paper: classes.drawerPaper,
        }}
    >
      <Toolbar > 
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon /> 
        </IconButton>
      </Toolbar>
      <div className={classes.drawerContainer}>

        <List>
          {arrangementListItems}
        </List>
      </div>
    </Drawer>
  )
}

export default ArrangementDrawer