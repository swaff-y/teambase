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

export const taskCategoriesAll = () => {
  return api.get(`/task-categories-all`,{
    headers: authHeaders()
  })
}

export const userOne = (user_id) => {
  return  api.get(`/user-one`,{
    headers: authHeaders(),
    params: {
      user_id: user_id
    }
  })
}

export const usersAll = () => {
  return api.get(`/users-all`,{
    headers: authHeaders()
  })
}

export const taskCreate = (formDetails) => {
  return api.post(`/task-create`,formDetails,{
    headers: authHeaders()
  })
}

export const taskRead = (task_id) => {
  return api.get(`/task-read`,{
    headers: authHeaders(),
    params:{
      task_id: task_id
    }
  })
}

export const taskUpdate = (formDetails) => {
  return api.post(`/task-update`,formDetails,{
    headers: authHeaders()
  })
}

export const taskDelete = (task_id) => {
  return api.delete(`/task-delete`,{
    headers: authHeaders(),
    data: {
      task_id: task_id
    }
  })
}

export const noteCreate = (task_id, user_id, note) => {
  return api.post(`/note-create`, {
    task_id: task_id,
    user_id: user_id,
    note: note
  },{
    headers: authHeaders()
  })
}

export const projectCategoriesAll = () => {
  return api.get(`/project-categories-all`,{
      headers: authHeaders()
    })
}

export const projectCreate = (formDetails) => {
  return api.post(`/project-create`,formDetails,{
    headers: authHeaders()
  })
}

export const projectRead = (project_id) => {
  return api.get(`/project-read`,{
    headers: authHeaders(),
    params: {
      project_id: project_id
    }
  })
}

export const projectUpdate = (formDetails) => {
  return api.post(`/project-update`,formDetails,{
    headers: authHeaders()
  })
}

export const projectDelete = (project_id) => {
  return api.delete(`/project-delete`,{
    headers: authHeaders(),
    data: {
      project_id: project_id
    }
  })
}

export const projectsUser = (user_id) => {
  return api.get(`projects-user`,{
    headers: authHeaders(),
    params: {
      user_id: user_id
    }
  })
}

export const projectUserStatus = (project_id, selection) => {
  return api.get(`project-user-status`,{
    headers: authHeaders(),
    params: {
      project_id: project_id,
      status: selection
    }
  })
}

export const taskPriorityUpdate = (task_id, priority) => {
  return api.post(`task-priority-update`,{
    task_id: task_id,
    priority: priority
  },{
    headers: authHeaders()
  })
}
