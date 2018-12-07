import { combineReducers } from 'redux-immutable';

import { categoryDialog, categories } from '../components/model';

const rootReducer = combineReducers({
  categoryDialog,
  categories
});

export default rootReducer;
