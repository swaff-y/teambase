import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import api from '../../api';

const UserSelect = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    api.get(`/users.json`)
    .then(res=>{
        setUsers(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[])

  const handleSelect = (e) => {
    // console.log("The index: ", e.target.);
    props.handleUpdateAssignee(e.target.value);
  }
  // let test = -1;
  return(
    <li className="">
      <select className="" onChange={handleSelect}>
        <option value={[props.assignee.id,props.index]}>{props.assignee.name}</option>
        {
          users.map((user, index)=>
            <option
              key={index}
              value={[user.id, props.index]}
            >{user.name}</option>
          )
        }
      </select>
        {
          props.last !== props.index
          ?
          <RemoveCircleIcon
            onClick={()=>props.handleRemoveAssignee(props.index)}
            style={{
              position: 'relative',
              top: '8px'
            }}
          />
          :
          <AddCircleOutlineIcon
            onClick={()=>props.handleAddAssignee()}
            style={{
              position: 'relative',
              top: '8px'
            }}
          />
        }
    </li>
  )
}

export default UserSelect;

// {
//   assigneesChange.map((assignee,index)=>
//     <li key={index}>
//         <select onChange={handleAssigneesChange}>
//           <option value={assignee.id} >{assignee.name}</option>
//           {
//             users.map((user,index)=>
//             <option
//               key={index}
//               value={user.id}
//             >
//             {
//               user.name
//             }
//             </option>
//             )
//           }
//         </select>
//         {
//           assigneesChange.length -1 !== index
//           ?
//           <RemoveCircleIcon
//             onClick={()=>handleRemoveAssignee(index)}
//             style={{
//               position: 'relative',
//               top: '-33px',
//               left: '240px',
//             }}
//           />
//           :
//           <AddCircleOutlineIcon
//             onClick={()=>handleAddAssignee(index)}
//             style={{
//               position: 'relative',
//               top: '-33px',
//               left: '240px',
//             }}
//           />
//         }
//     </li>
//   )
// }
