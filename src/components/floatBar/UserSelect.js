import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from 'react-avatar';
import api from '../../api';

const UserSelect = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

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
    setSelectedUser(e.target.value);
    props.handleSelected(e.target.value);
  }

  return(
    <div className="floatbar__assignees">
      {
        props.assignees.map((assignee,index)=>
        <span key={index}>
          <Avatar
            name={assignee.name}
            size="30"
            round
          />
          <HighlightOffIcon
            onClick={()=>{props.handleRemoveAssignee(index)}}
            style={{
              position: "relative",
              top: "-10px",
              right: "10",
              width:"18px",
              height:"18px",
            }}
          />
        </span>
        )
      }
      <select
        className="user__select"
        value={props.selected}
        onChange={handleSelect}
        style={props.inStyle}
      >
        <option></option>
        {
          users.map((user, index)=>
            <option
              key={index}
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
