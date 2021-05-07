import './App.css';
import React, {useEffect, useState} from 'react';
import Projects from "./Projects"

const USER = 236;

const App = () => {

  return (
    <div className="app" data-test="component-app">
      <Projects user={USER}/>
    </div>
  );
}

export default App;
