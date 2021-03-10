import logo from './logo.svg';
import './app.css';
import { Route, HashRouter as Router } from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import Toc from '@material-ui/icons/Toc';
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
