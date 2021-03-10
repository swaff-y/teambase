import React, {useEffect, useState} from 'react';
import Header from './header/Header'
import Content from './content/Content'
import "./main.css";

const Main = (props) => {
  return(
    <div className="main">
      <Header />
      <Content />
    </div>
  )
}

export default Main;
