import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilterBar from "./FilterBar";
import TaskBar from "./TaskBar";
import api from '../../../api';
import "./content.css";
import { authHeaders } from '../../../authUtils';

const Content = (props) => {

  const [selectedProject, setSelectedProject] = useState([]);
  const [filterSelection, setFilterSelection] = useState("In Progress");
  // const [projectStatus, setProjectStatus] = useState("In Progress");

  useEffect(()=>{

    if(props.selectedProject[1] > 1){
      api.get(`project-user-status/${props.selectedProject[1]}/${filterSelection}`,{
        headres: authHeaders()
      })
      .then(res=>{

        if(res.data.length < 1){
          setSelectedProject(res.data);
        }else{
          const taskArray = res.data;
          const numbers = [];
          for( let i = 0; i < taskArray.length; i++ ){
            numbers.push(taskArray[i].priority);
          }

          numbers.sort(compareNumbers);

          //this is a O(n^2) --> refactor in the future
          const returnArray = [];
          for( let i = 0; i < numbers.length; i++ ){
            for( let j = 0; j < taskArray.length; j++ ){
              if(taskArray[j].priority === numbers[i]){
                returnArray.push(taskArray[j]);
              }
            }
          }
          setSelectedProject(returnArray);
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

  const compareNumbers = (num1,num2) => {
     return num1 - num2;
  }

  const filterSelect = (type) => {
    setFilterSelection(type);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedProject);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for( let i = 0; i < items.length; i++ ){
      api.post(`task-priority-update/${items[i].id}/${i+1}`,{
        headres: authHeaders()
      })
      .then(res=>{
        // console.log("The return: ",res.data, "The item: ", items[i]);
      })
      .catch(err=>{
        console.warn(err);
      })
    }

    setSelectedProject(items);
  }

  // console.log(filterSelection)
  return(
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="content" data-test="component-content">
        <div className="content__spacer"></div>
        <FilterBar
          filterSelect={filterSelect}
          selectedProject={props.selectedProject} filterSelection={filterSelection} showFloatTaskBar={props.showFloatTaskBar}
          floatStatus={props.floatStatus}
          taskDelete={props.taskDelete}
        />
        <div className="content__headings">
          <span id="headerPriority">Priority</span>
          <span id="headerName">Task Name</span>
          <span id="headerStatus">Status</span>
          <span id="headerDueDate">Due Date</span>
          <span id="headerProgress">Progress</span>
          <span id="headerAssignees">Assignees</span>
        </div>
        <div className="content__spacer"></div>
          <Droppable droppableId="task">
            {(provided) =>
              (
                <div
                  className="tasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                {
                  selectedProject.map(({id,name,status,due_date,progress,users}, index)=>{
                    return(
                      <Draggable
                        key={name + id}
                        draggableId={name + id}
                        index={index}>
                        {(provided) => (
                          <TaskBar
                            key={index}
                            index={index + 1}
                            id={id}
                            name={name}
                            status={status}
                            dueDate={due_date}
                            progress={progress}
                            users={users}
                            handleTaskEdit={props.handleTaskEdit}
                            handleTaskNote={props.handleTaskNote}
                            handleTaskDelete={props.handleTaskDelete}
                            innerRef={provided.innerRef} drags={provided.draggableProps} handles={provided.dragHandleProps}
                          />)
                        }
                      </Draggable>
                    );
                  })
                }
                {provided.placeholder}
                </div>
              )
            }
          </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Content;
