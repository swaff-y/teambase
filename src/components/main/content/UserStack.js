import React, {useEffect, useState} from 'react';
import Avatar from 'react-avatar';
import "./content.css";

const UserStack = (props) => {
  return(
    <span className="content__userStack">
      <Avatar name={props.user.name} size="30" round style={{marginTop:"-30px", marginLeft:"20px"}}/>
    </span>
  )
}

export default UserStack;
