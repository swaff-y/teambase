import React, {useEffect, useState} from 'react';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ViewListIcon from '@material-ui/icons/ViewList';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import './sidebar.css'

const Sidebar = (props) => {
  return(
    <div className="sidebar">
      <div className="sideber__logo">
        <FilterHdrIcon fontSize="large" style={{marginTop:'15px', marginLeft: '100px', color: '#FFFFFF'}}/>
        <h1 className="sidebar__header">Teambase</h1>
      </div>
      <div className="sidebar__button">
        <p>New Project</p>
      </div>
      <div className="sidebar__projects">
        <ViewListIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}} />
        <span>Projects</span>
        <ArrowForwardIosIcon fontSize="small" style={{position:'relative', top:'-1px', color: 'white', marginLeft:'90px'}} />
      </div>
      <div className="sidebar__analytics">
        <InsertChartIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}}/>
        <span>Analytics</span>
      </div>
      <div className="sidebar__teamMembers">
        <PeopleIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}}/>
        <span>Team Members</span>
      </div>
    </div>
  )
}

export default Sidebar;
