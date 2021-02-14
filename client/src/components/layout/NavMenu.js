import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import SignOutButton from "../authentication/SignOutButton"

const NavMenu = ({topBarClassSections}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const menuItems = topBarClassSections.map(classSection => {
    return (
      <MenuItem 
      key={classSection.id}
      >
        <Link className="top-bar-link" to={`/classes/${classSection.id}/students`}>{classSection.name} Students</Link>
      </MenuItem>
    )
  })

  return (
    <div>
      <IconButton aria-haspopup="true"
      onClick={handleClick}>
        Menu <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="top-bar-link"
      > 
        <MenuItem>
          <Link to="/classes">
            All Classes
          </Link>
        </MenuItem>
        {menuItems}
        <MenuItem>
          <SignOutButton />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default NavMenu