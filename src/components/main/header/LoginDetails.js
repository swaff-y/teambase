// import React, {useEffect, useState} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from 'react-avatar';
import "./loginDetails.css";

const LoginDetails = (props) => {
  return(
    <div className="loginDetails" data-test="component-loginDetails">
      <SettingsIcon
        fontSize="large"
        style={{
          marginTop:"30px"
        }}
      />
      <Avatar
        name={props.userName}
        size="60"
        round
        style={{
          marginTop:"-30px",
          marginLeft:"20px"}}
      />
    </div>
  )
}

export default LoginDetails;
