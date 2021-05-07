import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import {Helmet} from 'react-helmet'
import Login from "./Login"
import Projects from "./Projects"
import Analytics from "./Analytics"
import TeamMembers from "./TeamMembers"

const USER = 236;

const App = () => {

  return (
    <div className="app" data-test="component-app">
      <Helmet>
        <title>Teambase - Team project organisation tool</title>
          <meta name="description" content="A tool desiged with team colaboration for on time project delivery" />
      </Helmet>

      <Router>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/projects">
          <Projects user={USER}/>
        </Route>
        <Route path="/analytics">
          <Analytics user={USER}/>
        </Route>
        <Route path="/team_members">
          <TeamMembers user={USER}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
