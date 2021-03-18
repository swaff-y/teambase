import React, {useEffect, useState} from 'react';
import ProjectTitle from "./ProjectTitle"
import LoginDetails from "./LoginDetails"
import "./header.css";

const Header = (props) => {
  return(
    <div className="header" data-test="component-header">
      <div className="header__left"><ProjectTitle /></div>
      <div className="header__right"><LoginDetails /></div>
    </div>
  )
}

export default Header;
