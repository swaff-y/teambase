import React, {useEffect, useState} from 'react';
import "./analytics.css";
import {Helmet} from 'react-helmet'

const Analytics = (props) => {
  return(
    <div className="analytics">
    <Helmet>
      <title>Teambase - Analytics</title>
        <meta name="description" content="Team Members" />
    </Helmet>
      <h1>Analytics</h1>
    </div>
  )
}

export default Analytics;
