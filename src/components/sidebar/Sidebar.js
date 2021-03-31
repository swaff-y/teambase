import React, {useEffect, useState} from 'react';
import ProjectList from './ProjectList';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import './sidebar.css'

const Sidebar = (props) => {
  const [projectShow, setProjectShow] = useState("none");

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
        <FilterHdrIcon
          fontSize="large"
          style={{
            marginTop:'15px',
            marginLeft: '100px',
            color: '#FFFFFF'
          }}
        />
        <h1 className="sidebar__header">Teambase</h1>
      </div>
      <Button
       variant="outlined"
       style={{
         color: '#FFFFFF',
         border: '1px solid #FFFFFF',
         marginLeft: '50px',
         marginTop: '10px',
       }}
      >
      New Project
      </Button>
      <div
        className="sidebar__projects"
        onClick={projectShowToggle}
      >
        <IconButton
        style={{
          position: 'relative',
          top: '20px',
          marginLeft: '-15px',
          color:'#6686CC',
          borderRadius: '1px',
          fontSize: '14pt'
        }}
        >
          <ViewListIcon
            fontSize="small"
            style={{
              marginRight:'25px'}}
          />
          Projects

        {
          projectShow === 'none'
          ?
          <ChevronRightIcon
            fontSize="large"
            style={{
              position:'relative',
              top:'-1px',
              color: 'white',
              marginLeft:'80px'
            }}
          />
          :
          <ExpandMoreIcon
            fontSize="large"
            style={{
              position:'relative',
              top:'-1px',
              color: 'white',
              marginLeft:'80px'
            }}
          />
        }
        </IconButton>

      </div>
      <div className="sidebar__projectsShow" style={{display:projectShow}}>
        <ul className="sidebar__projectList">
          {
            props.projectData.map((project,index)=>
              <ProjectList
                key={index}
                project={project}
                handleClick={props.selectedProject}         handleProject={props.handleProject}
                user={props.user}
              />)
          }
        </ul>
      </div>
      <div className="sidebar__analytics">
        <IconButton
        style={{
          position: 'relative',
          top: '0px',
          color:'#6686CC',
          borderRadius: '1px',
          fontSize: '14pt',
          width: "100%",
        }}
        >
          <InsertChartIcon
            fontSize="small"
            style={{
              marginLeft:'-95px',
              marginRight:'25px',
              color:'#FFFFFF'
            }}
          />
          Analytics
        </IconButton>
      </div>
      <div className="sidebar__teamMembers">
        <IconButton
        style={{
          position: 'relative',
          top: '-15px',
          color:'#6686CC',
          borderRadius: '1px',
          fontSize: '14pt',
          width: "100%",
        }}
        >
          <PeopleIcon
            fontSize="small"
            style={{
              marginLeft:'-40px',
              marginRight:'25px',
              color:'#FFFFFF'
            }}
          />
          Team Members
        </IconButton>
      </div>
    </div>
  )
}

export default Sidebar;
