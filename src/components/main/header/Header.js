import React, {useState, useEffect} from 'react';
import ProjectTitle from "./ProjectTitle"
import LoginDetails from "./LoginDetails"
import { useHistory } from "react-router-dom";
import "./header.css";
import api from '../../../api';
import { authHeaders } from '../../../authUtils';

const USER = localStorage.user

const Header = (props) => {
  const [userName, setUserName] = useState("");
  let history = useHistory();
  // let params = useParams();

  useEffect(()=>{
    api.get(`/user-one/${USER}`,{
      headers: authHeaders()
    })
    .then(res=>{
      setUserName(res.data.name)
    })
    .catch(err=>{
      console.warn(err);
    })
  },[])

  return(
    <div className="header" data-test="component-header">
      <div className="header__left"><ProjectTitle selectedProject={props.selectedProject}/></div>
      <div className="header__right"><LoginDetails userName={userName}/></div>
    </div>
  )
}

export default Header;
