import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import ClassSectionIndex from "./classPage/ClassSectionIndex";
import StudentRosterPage from "./studentRosterPage/StudentRosterPage";
import ArrangementShow from "./arrangementIndexPage/ArrangementShow";
import LandingPage from "./layout/LandingPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute
          exact
          path="/classes/:id/students"
          component={StudentRosterPage}
          user={currentUser}
        />
        <AuthenticatedRoute
          exact
          path="/classes/:id/groups"
          component={ArrangementShow}
          user={currentUser}
        />
        <AuthenticatedRoute
          exact
          path="/classes"
          component={ClassSectionIndex}
          user={currentUser}
        />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default hot(App);
