import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from 'react-avatar';
import api from '../../api';

const UserSelect = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  // const [selected, setSelected] = useState(props.selected);

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
    // props.handleUpdateAssignee(e.target.value);
    setSelectedUser(e.target.value);
    props.handleSelected(e.target.value);
  }
  // let test = -1;
  return(
    <div className="floatbar__assignees">
      {
        props.assignees.map((assignee,index)=>
        <>
          <Avatar
            key={index}
            name={assignee.name}
            size="30"
            round
          />
          <HighlightOffIcon
            onClick={()=>{props.handleRemoveAssignee(index)}}
            key={index+"a"}
            style={{
              position: "relative",
              top: "-10px",
              right: "10",
              width:"18px",
              height:"18px",
            }}
          />
        </>
        )
      }
      <select className="" value={props.selected} onChange={handleSelect}>
        <option></option>
        {
          users.map((user, index)=>
            <option
              key={index + "b"}
              value={[user.id]}
            >{user.name}</option>
          )
        }
      </select>
          <AddCircleOutlineIcon
            onClick={()=>props.handleAddAssignee(selectedUser)}
            style={{
              position: 'relative',
              top: '8px'
            }}
          />
    </div>
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
