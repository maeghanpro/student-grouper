import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";

import NavMenu from "./NavMenu"

const TopBar = ({ user}) => {

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className= "button signIn">
        Sign In
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button signUp">
        Sign Up
      </Link>
    </li>,
  ];

  let topBarRightContent = null
  if (user === null) {
    topBarRightContent = unauthenticatedListItems
  } else {
    topBarRightContent = <NavMenu />
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">
         <img className="logo" src={logo} alt="Logo"/>
        </Link>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          {topBarRightContent}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
