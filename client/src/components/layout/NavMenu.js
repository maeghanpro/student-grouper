import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SignOutButton from "../authentication/SignOutButton";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [classSections, setClassSections] = useState([]);

  const getClassSections = async () => {
    try {
      const response = await fetch("/api/v1/classes");

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }

      const body = await response.json();
      setClassSections(body.classSections);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const NavLink = ({ to, children }) => (
    <Link onClick={handleClose} to={to}>
      {children}
    </Link>
  );

  const menuItems = classSections.map((classSection) => {
    let groupsLink;
    if (classSection.students.length >= 2) {
      groupsLink = <NavLink to={`/classes/${classSection.id}/groups`}>Groups</NavLink>;
    }

    return (
      <Accordion key={classSection.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MenuItem key={classSection.id}>{classSection.name}</MenuItem>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem>
            <NavLink to={`/classes/${classSection.id}/students`}> Students</NavLink>
          </MenuItem>
          <MenuItem>{groupsLink}</MenuItem>
        </AccordionDetails>
      </Accordion>
    );
  });

  useEffect(() => {
    getClassSections();
  }, []);

  return (
    <div>
      <IconButton className="menu-button" aria-haspopup="true" onClick={handleClick}>
        Menu 
{' '}
<MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="nav-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem>
          <NavLink to="/classes">All Classes</NavLink>
        </MenuItem>
        {menuItems}
        <MenuItem>
          <SignOutButton />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
