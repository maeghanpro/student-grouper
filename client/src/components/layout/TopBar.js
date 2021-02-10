import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import logo from "../../../public/logo.png"

const TopBar = ({ user }) => {
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

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  const authenticatedLeftListItems = [
    <li key="classes">
      <Link className="top-bar-link" to="/classes">Classes</Link>
    </li> 
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <img className="logo" src={logo} alt="Logo"/>
        <ul className="menu">
          <li>
            <Link className="top-bar-link" to="/">Home</Link>
          </li>
          <>{user ? authenticatedLeftListItems : undefined} </>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
