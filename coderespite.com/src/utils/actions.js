// actions.js
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const fetchProjects = (table) => async (dispatch) => {
  const response = await fetch(`https://coderespite.com/api/projects/${table}`);
  const data = await response.json();
  console.log(data);
  
  dispatch({ type: FETCH_PROJECTS, payload: { table, data } });
};

export const addProject = (table, project) => async (dispatch) => {
  
  const response = await fetch(`https://coderespite.com/api/projects/${table}`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
   const data = await response.json();
  console.log("data", data);
  
  if (data.status === 1) {
    dispatch({ type: ADD_PROJECT, payload: { table, project } });

  }
};

export const updateProject = (table, project) => async (dispatch) => {
  const response = await fetch(`https://coderespite.com/api/projects/${table}/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  if (data.status === 1) {
    
    dispatch({ type: UPDATE_PROJECT, payload: { table, project } });
    
  }
};

export const deleteProject = (table, id) => async (dispatch) => {
  const response = await fetch(`https://coderespite.com/api/projects/${table}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data.status === 1) {
    dispatch({ type: DELETE_PROJECT, payload: { table, id } });
  }
};
