import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login";
import StudentRegister from "../StudentRegister";
import TeacherRegister from "../TeacherRegister";
import Home from "../../Home";
import Charts from "../Charts";
import Landing from "../Landing";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/StudentRegister">
            <StudentRegister />
          </Route>
          <Route path="/TeacherRegister">
            <TeacherRegister />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Charts">
            <Charts />
          </Route>
          <Route path="/Landing">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
