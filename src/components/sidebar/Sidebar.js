import React, {useState, useEffect} from 'react';
import ProjectList from './ProjectList';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './sidebar.css'
import api from '../../api';

const Sidebar = (props) => {
  const [projectShow, setProjectShow] = useState("none");
  const [projectList,setProjectList] = useState(props.projectData)

  useEffect(()=>{
    setProjectList(props.projectData)
  },[props.projectData])

  const projectShowToggle = () => {
    if(projectShow === "none"){
      setProjectShow('');
      return;
    }
    setProjectShow('none');
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(projectList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for( let i = 0; i < items.length; i++ ){
      api.post(`project-priority-update/${items[i].id}/${i+1}`)
      .then(res=>{
          // console.log("The return: ",res.data, "The item: ", items[i]);
      })
      .catch(err=>{
        console.warn(err);
      })
    }

    setProjectList(items);
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
        onClick={props.handleProjectAdd}
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="project">
            {
              (provided)=>(
                <ul className="sidebar__projectList"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                  {
                    projectList.map(({id,name},index)=>{
                      return(
                        <Draggable
                          key={name}
                          draggableId={name}
                          index={index}>
                          {
                            (provided)=>(
                              <ProjectList
                                key={index}
                                id={id}
                                name={name}
                                handleClick={props.selectedProject}
                                handleProjectEdit={props.handleProjectEdit}
                                user={props.user}
                                innerRef={provided.innerRef}
                                drags={provided.draggableProps}
                                handles={provided.dragHandleProps}
                              />
                            )
                          }
                        </Draggable>
                      )
                    })
                  }
                  {provided.placeholder}
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>
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
