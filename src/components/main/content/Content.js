import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilterBar from "./FilterBar";
import TaskBar from "./TaskBar";
import api from '../../../api';
import "./content.css";

const Content = (props) => {

  const [selectedProject, setSelectedProject] = useState([]);
  const [filterSelection, setFilterSelection] = useState("In Progress");
  // const [projectStatus, setProjectStatus] = useState("In Progress");

  useEffect(()=>{
    if(props.selectedProject[1] > 1){
      api.get(`project-user-status/${props.selectedProject[1]}/${filterSelection}`)
      .then(res=>{
        if(res.data !== null){
          setSelectedProject(res.data);
        }
      })
      .catch(err=>{
        console.warn(err);
      })
    }
  },[
      filterSelection,
      props.selectedProject[1],
      props.floatStatus,
      props.taskDelete
    ]);

  const filterSelect = (type) => {
    setFilterSelection(type);
  }
  // console.log(filterSelection)
  return(
    <div className="content" data-test="component-content">
      <div className="content__spacer"></div>
      <FilterBar
        filterSelect={filterSelect}
        selectedProject={props.selectedProject} filterSelection={filterSelection} showFloatTaskBar={props.showFloatTaskBar}
        floatStatus={props.floatStatus}
        taskDelete={props.taskDelete}
      />
      <div className="content__headings">
        <span id="headerName">Task Name</span>
        <span id="headerStatus">Status</span>
        <span id="headerDueDate">Due Date</span>
        <span id="headerProgress">Progress</span>
        <span id="headerAssignees">Assignees</span>
      </div>
      <div className="content__spacer"></div>
      <DragDropContext>
        <Droppable droppableId="characters">
          {(provided) =>
            (
              <div className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
              {
                selectedProject.map((task, index)=>{
                  return(
                    <Draggable key={index} draggableId={task} index={index}>
                      {(provided) => (
                        <TaskBar
                          key={index}
                          task={task}
                          handleTaskEdit={props.handleTaskEdit}
                          handleTaskNote={props.handleTaskNote}
                          handleTaskDelete={props.handleTaskDelete}
                        />)
                      }
                    </Draggable>
                  );
                })
              }
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Content;

// <DragDropContext>
//   <Droppable droppableId="characters">
//     {(provided) =>
//       (
//         <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
//         selectedProject.map((task, index)=>{
//           return(
//             <Draggable key={index}>
//               {(provided) => (
//                 <TaskBar
//                   key={index}
//                   task={task}
//                   handleTaskEdit={props.handleTaskEdit}
//                   handleTaskNote={props.handleTaskNote}
//                   handleTaskDelete={props.handleTaskDelete}
//                 />)
//               }
//             </Draggable>)}
//         </div>
//       )
//     }
//   </Droppable>
// </DragDropContext>
