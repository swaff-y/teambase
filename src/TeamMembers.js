import React, {useEffect, useState} from 'react';
import "./team_members.css";
import {Helmet} from 'react-helmet'

const TeamMembers = (props) => {
  return(
    <div className="team_members">
    <Helmet>
      <title>Teambase - Team Members</title>
        <meta name="description" content="Team Members" />
    </Helmet>
      <h1>Team Members</h1>
    </div>
  )
}

export default TeamMembers;
