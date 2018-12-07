import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import _reduce from 'lodash/reduce';

import { ActionTypes } from '../components/model';

const clients = (state = Immutable.Map(), action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.CLIENTS_FETCH_SUCCESS:
      return Immutable.fromJS(
        _reduce(
          payload.data,
          (memo, client) => {
            memo[client._id] = client;
            return memo;
          },
          {}
        )
      );
    case ActionTypes.CLIENT_REMOVE_SUCCESS:
      return state.delete(payload.id);
    case ActionTypes.CLIENT_ADD_SUCCESS:
      return state.set(payload.data._id, Immutable.fromJS(payload.data));
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  clients
});

export default rootReducer;
