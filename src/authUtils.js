import api from './api';

export const authHeaders = () => {
  const authHeaders = {
    Authorization: 'Bearer ' + localStorage.jwt
  }
  // console.log("authHeaders: ", authHeaders);
  return authHeaders;
}

export const projectPriorityUpdate = (project_id,priority) => {
  return api.post(`project-priority-update`,{
    project_id: project_id,
    priority: priority
  },{
    headers: authHeaders()
  })
}
