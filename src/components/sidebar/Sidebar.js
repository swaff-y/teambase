import React, {useEffect, useState} from 'react';
import ProjectList from './ProjectList';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import api from '../../api';
import './sidebar.css'

const Sidebar = (props) => {
  const [projectData, setProjectData] = useState([]);
  const [projectShow, setProjectShow] = useState("none");

  useEffect(()=>{
    api.get(`projects-user/${props.user}`)
    .then(res=>{
      setProjectData(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })

  },[]);

  // console.log(projectData);

  const projectShowToggle = () => {
    if(projectShow === "none"){
      setProjectShow('');
      return;
    }
    setProjectShow('none');
  }

  return(
    <div className="sidebar" data-test="component-sidebar">
      <div className="sideber__logo">
        <FilterHdrIcon fontSize="large" style={{marginTop:'15px', marginLeft: '100px', color: '#FFFFFF'}}/>
        <h1 className="sidebar__header">Teambase</h1>
      </div>
      <div className="sidebar__button">
        <p>New Project</p>
      </div>
      <div className="sidebar__projects" onClick={projectShowToggle}>
        <ViewListIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}} />
        <span>Projects</span>
        {
          projectShow === 'none'
          ?
          <ChevronRightIcon fontSize="medium" style={{position:'relative', top:'-1px', color: 'white', marginLeft:'90px'}}/>
          :
          <ExpandMoreIcon fontSize="medium" style={{position:'relative', top:'-1px', color: 'white', marginLeft:'90px'}}/>
        }

      </div>
      <div className="sidebar__projectsShow" style={{display:projectShow}}>
        <ul className="sidebar__projectList">
          {
            projectData.map((project,index)=><ProjectList key={index} project={project} handleClick={props.selectedProject}/>)
          }
        </ul>
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
