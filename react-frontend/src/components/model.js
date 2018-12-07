import { booleanReducer, stringReducer } from 'redux-common-reducers';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

import { createAction, enumerable } from '../utils';

export const ActionTypes = enumerable(
  'CATEGORY_DIALOG_OPEN',
  'CATEGORY_DIALOG_CLOSE',
  'CATEGORY_ADD',
  'CATEGORY_REMOVE'
);

export const openCategoryDialog = data =>
  createAction(ActionTypes.CATEGORY_DIALOG_OPEN, data);
export const closeCategoryDialog = () =>
  createAction(ActionTypes.CATEGORY_DIALOG_CLOSE);

export const addCategory = data => createAction(ActionTypes.CATEGORY_ADD, data);
export const removeCategory = data =>
  createAction(ActionTypes.CATEGORY_REMOVE, data);

export const getCategoryDialog = state =>
  state.getIn(['app', 'categoryDialog']);
export const getActive = state => getCategoryDialog(state).get('active');
export const getSelectedDate = state =>
  getCategoryDialog(state).get('selectedDate');
export const getCategories = state => state.getIn(['app', 'categories']);

export const categoryDialog = combineReducers({
  active: booleanReducer(
    [ActionTypes.CATEGORY_DIALOG_OPEN],
    [
      ActionTypes.CATEGORY_DIALOG_CLOSE,
      ActionTypes.CATEGORY_ADD,
      ActionTypes.CATEGORY_REMOVE
    ]
  ),
  selectedDate: stringReducer(
    [ActionTypes.CATEGORY_DIALOG_OPEN],
    [ActionTypes.CATEGORY_DIALOG_CLOSE],
    'payload'
  )
});

export const categories = (state = Immutable.Map(), action) => {
  const { type } = action;

  switch (type) {
    case ActionTypes.CATEGORY_ADD: {
      const { category, date } = action.payload;
      return state.set(date, category);
    }
    case ActionTypes.CATEGORY_REMOVE: {
      const { date } = action.payload;
      return state.delete(date);
    }
    default:
      return state;
  }
};
