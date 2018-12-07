import { BACKEND_PATH, defaultConfig } from './utils';

const API_PATH = `${BACKEND_PATH}/api/notes`;

export const fetchNotes = () => {
  return fetch(`${API_PATH}/all`).then(res => res.json());
};

export const fetchNote = id => {
  return fetch(`${API_PATH}/${id}`).then(res => res.json());
};

export const addNote = ({ clientId, content }) => {
  const config = {
    ...defaultConfig({ content, client: clientId }),
    method: 'POST'
  };
  return fetch(`${API_PATH}/add/${clientId}`, config);
};

export const removeNote = id => {
  const config = {
    ...defaultConfig({ id }),
    method: 'DELETE'
  };
  return fetch(`${API_PATH}/delete`, config);
};

export const updateNote = ({ id, content }) => {
  const config = {
    ...defaultConfig({ content }),
    method: 'POST'
  };
  return fetch(`${API_PATH}/update/${id}`, config);
};
