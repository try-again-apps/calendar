import { push } from 'react-router-redux';

import { createAction, enumerable } from '../utils';
import {
  addClient as addClientTask,
  fetchClients as fetchClientsTask,
  removeClient as removeClientTask,
  updateClient as updateClientTask
} from '../actions/clients';
import {
  addNote as addNoteTask,
  removeNote as removeNoteTask,
  updateNote as updateNoteTask
} from '../actions/notes';

export const getClients = state => state.getIn(['app', 'clients']);

export const ActionTypes = enumerable(
  'CLIENT_ADD_FAILURE',
  'CLIENT_ADD_REQUEST',
  'CLIENT_ADD_SUCCESS',
  'CLIENT_UPDATE_FAILURE',
  'CLIENT_UPDATE_REQUEST',
  'CLIENT_UPDATE_SUCCESS',
  'CLIENT_REMOVE_FAILURE',
  'CLIENT_REMOVE_REQUEST',
  'CLIENT_REMOVE_SUCCESS',
  'CLIENTS_FETCH_FAILURE',
  'CLIENTS_FETCH_REQUEST',
  'CLIENTS_FETCH_SUCCESS',
  'NOTE_ADD_REQUEST',
  'NOTE_ADD_FAILURE',
  'NOTE_ADD_SUCCESS',
  'NOTE_UPDATE_REQUEST',
  'NOTE_UPDATE_FAILURE',
  'NOTE_UPDATE_SUCCESS',
  'NOTE_REMOVE_REQUEST',
  'NOTE_REMOVE_FAILURE',
  'NOTE_REMOVE_SUCCESS'
);

const addClientFailure = err =>
  createAction(ActionTypes.CLIENT_ADD_FAILURE, { err });
const addClientRequest = () => createAction(ActionTypes.CLIENT_ADD_REQUEST);
const addClientSuccess = data =>
  createAction(ActionTypes.CLIENT_ADD_SUCCESS, { data });

const removeClientRequest = () =>
  createAction(ActionTypes.CLIENT_REMOVE_REQUEST);
const removeClientSuccess = id =>
  createAction(ActionTypes.CLIENT_REMOVE_SUCCESS, { id });
const removeClientFailure = err =>
  createAction(ActionTypes.CLIENT_REMOVE_FAILURE, { err });

const fetchClientsRequest = () =>
  createAction(ActionTypes.CLIENTS_FETCH_REQUEST);
const fetchClientsSuccess = data =>
  createAction(ActionTypes.CLIENTS_FETCH_SUCCESS, { data });
const fetchClientsFailure = err =>
  createAction(ActionTypes.CLIENTS_FETCH_FAILURE, { err });

const updateClientRequest = () =>
  createAction(ActionTypes.CLIENT_UPDATE_REQUEST);
const updateClientSuccess = data =>
  createAction(ActionTypes.CLIENT_UPDATE_SUCCESS, { data });
const updateClientFailure = err =>
  createAction(ActionTypes.CLIENT_UPDATE_FAILURE, { err });

const addNoteRequest = () => createAction(ActionTypes.NOTE_ADD_REQUEST);
const addNoteSuccess = data =>
  createAction(ActionTypes.NOTE_ADD_SUCCESS, { data });
const addNoteFailure = err =>
  createAction(ActionTypes.NOTE_ADD_FAILURE, { err });

const updateNoteRequest = () => createAction(ActionTypes.NOTE_UPDATE_REQUEST);
const updateNoteSuccess = data =>
  createAction(ActionTypes.NOTE_UPDATE_SUCCESS, { data });
const updateNoteFailure = err =>
  createAction(ActionTypes.NOTE_UPDATE_FAILURE, { err });

const removeNoteRequest = () => createAction(ActionTypes.NOTE_REMOVE_REQUEST);
const removeNoteSuccess = id =>
  createAction(ActionTypes.NOTE_REMOVE_SUCCESS, { id });
const removeNoteFailure = err =>
  createAction(ActionTypes.NOTE_REMOVE_FAILURE, { err });

export const addClient = data => dispatch => {
  dispatch(addClientRequest());
  return addClientTask(data)
    .then(res => dispatch(addClientSuccess(res)))
    .catch(err => dispatch(addClientFailure(err)));
};

export const removeClient = id => dispatch => {
  dispatch(removeClientRequest());
  return removeClientTask(id)
    .then(_ => dispatch(removeClientSuccess(id)))
    .catch(err => removeClientFailure(err));
};

export const fetchClients = options => dispatch => {
  dispatch(fetchClientsRequest());
  return fetchClientsTask(options)
    .then(res => dispatch(fetchClientsSuccess(res)))
    .catch(err => fetchClientsFailure(err));
};

export const updateClient = data => dispatch => {
  dispatch(updateClientRequest());
  return updateClientTask(data)
    .then(res => {
      dispatch(updateClientSuccess(res));
      dispatch(showClientDetails({ id: data.id }));
    })
    .catch(err => updateClientFailure(err));
};

export const showClientDetails = ({ id }) => dispatch => {
  dispatch(push(`/client/${id}`));
};

export const addNote = ({ clientId, content }) => dispatch => {
  dispatch(addNoteRequest());
  return addNoteTask({ clientId, content })
    .then(res => {
      dispatch(addNoteSuccess(res));
      dispatch(push(`client/${clientId}`));
    })
    .catch(err => dispatch(addNoteFailure(err)));
};

export const removeNote = id => dispatch => {
  dispatch(removeNoteRequest());
  return removeNoteTask(id)
    .then(_ => dispatch(removeNoteSuccess(id)))
    .catch(err => dispatch(removeNoteFailure(err)));
};

export const updateNote = ({ noteId, content, clientId }) => dispatch => {
  dispatch(updateNoteRequest());
  return updateNoteTask({ id: noteId, content })
    .then(res => {
      dispatch(updateNoteSuccess(res));
      dispatch(push(`/client/${clientId}`));
    })
    .catch(err => updateNoteFailure(err));
};
