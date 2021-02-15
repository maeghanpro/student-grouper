import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Menu, MenuItem, IconButton, Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SignOutButton from "../authentication/SignOutButton"


const NavMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [classSections, setClassSections] = useState([])

  const getClassSections = async () => {
    try {
      const response = await fetch('/api/v1/classes')

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()
      setClassSections(body.classSections)

    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = classSections.map(classSection => {
    let groupsLink
    if (classSection.students.length >= 2) {
      groupsLink = <Link to={`/classes/${classSection.id}/groups`}>Groups</Link>
    }

    return (
      <Accordion key={classSection.id}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
          <MenuItem 
          key={classSection.id}
          >
            {classSection.name}
          </MenuItem>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem>
            <Link to={`/classes/${classSection.id}/students`}> Students</Link>
          </MenuItem>
          <MenuItem>
            {groupsLink}
          </MenuItem>
        </AccordionDetails>
      </Accordion>
    )
  })

  useEffect(() => {
    getClassSections()
  }, [])

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
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
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