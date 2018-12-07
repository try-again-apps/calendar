import { BACKEND_PATH, defaultConfig } from './utils';

const API_PATH = `${BACKEND_PATH}/api/clients`;

export const fetchClients = ({
  sortBy = 'name',
  sortOrder = 'asc',
  filterBy = 'all'
} = {}) => {
  return fetch(
    `${API_PATH}/all?filterBy=${filterBy}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  ).then(res => res.json());
};

export const fetchClient = id => {
  return fetch(`${API_PATH}/${id}`).then(res => res.json());
};

export const addClient = ({ name, details, status }) => {
  const config = {
    ...defaultConfig({ name, details, status }),
    method: 'POST'
  };
  return fetch(`${API_PATH}/add`, config).then(res => res.json());
};

export const removeClient = id => {
  const config = {
    ...defaultConfig({ id }),
    method: 'DELETE'
  };
  return fetch(`${API_PATH}/delete`, config);
};

export const updateClient = ({ id, name, details, status }) => {
  const config = {
    ...defaultConfig({ name, details, status }),
    method: 'POST'
  };
  return fetch(`${API_PATH}/update/${id}`, config);
};
